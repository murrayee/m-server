/**
 * Created by bear on 2017/7/17.
 */
const userCode = require("../utils/code")
const userService = require("../services/userService");
const pinyin = require('pinyin')
/**
 * 获取用户首字母 toLowerCase//转小写 toUpperCase 转大写
 */
function getNameFirstLetter(name) {
    let result = pinyin(name[0]);
    return result[0][0][0].toUpperCase();
}

const userController = {
    /**
     * 登录操作
     * @param ctx   上下文对象  来源于 {koa-router}
     * @returns {Promise.<void>}
     */
    async login(ctx) {
        let formData = ctx.request.body

        // console.log(formData)
        let result = {
            success: false,
            message: '',
            data: null,
            code: ''
        };
        let data = await userService.login(formData)


        if (data) {
            if (formData.username == data.username && formData.password == data.password) {
                result.success = true
                result.code = 'SUCCESS_LOGIN'
                result.message = userCode.SUCCESS_LOGIN
                result.data = data
                ctx.body = result

            } else {
                result.message = userCode.FAIL_USER_NAME_OR_PASSWORD_ERROR
                result.code = 'FAIL_USER_NAME_OR_PASSWORD_ERROR'
            }
        } else {
            result.code = 'FAIL_USER_NO_EXIST'
            result.message = userCode.FAIL_USER_NO_EXIST

            ctx.body = result
        }

        if (result.success === true) {
            let session = ctx.session
            session.isLogin = true
            session.username = data.username
            session.userId = data._id
            console.log(session)
        }
    },

    /**
     * 注册操作
     * @param ctx
     * @returns {Promise.<void>}
     */
    async reg(ctx) {
        let formData = ctx.request.body
        let result = {
            success: false,
            message: '',
            data: null,
            code: ""
        };


        formData= Object.assign({},formData,{CN:getNameFirstLetter(formData.username)})



        console.log(formData)
        let validateResult = userService.validator(formData)

        if (validateResult.success === false) {
            result = validateResult
            ctx.body = result
            return
        }

        let existOne = await userService.isUse(formData.username)
        let letter = getNameFirstLetter(formData.username);
        console.log(letter)
        if (existOne) {
            if (existOne.username === formData.username) {
                result.message = userCode.FAIL_USER_NAME_IS_EXIST
                result.code = "FAIL_USER_NAME_IS_EXIST"
                ctx.body = result
                return
            }
        }
        let regData = await userService.reg(formData)

        if (regData) {
            result.success = true
            result.message = userCode.SUCCESS_REG
            result.code = "SUCCESS_REG"
        } else {
            result.message = userCode.ERROR_SYS
            result.code = "ERROR_SYS"
        }

        ctx.body = result
    },

    /**
     * 获取用户信息操作
     * @param ctx
     * @returns {Promise.<void>}
     */
    async getUserInfo(ctx) {
        let session = ctx.session
        let isLogin = session.isLogin
        let username = session.username
        console.log('session=', session)
        let result = {
            success: false,
            message: '',
            data: null,
        }
        if (isLogin === true && username) {
            let userInfo = await userService.getUserInfo(username)
            if (userInfo) {
                result.data = userInfo
                result.success = true
            } else {
                result.message = userCode.FAIL_USER_NO_LOGIN
            }
        } else {
            // TODO
        }

        ctx.body = result
    },
    /**
     * 获取用户信息操作
     * @param ctx
     * @returns {Promise.<void>}
     */
    async getAll(ctx) {

        let result = {
            success: false,
            message: '',
            data: null,
        }

            let userAll = await userService.getAll()
            if (userAll) {
                result.data = userAll
                result.success = true
                result.message = userCode.SUCCESS_GETALL
            } else {
                result.message = userCode.FAIL_GETALL
            }

        ctx.body = result
    },
    /**
     * 校验登录状态
     * @param ctx
     * @returns {{success: boolean, message: string, data: null, code: string}}
     */
    validateLogin(ctx) {
        let result = {
            success: false,
            message: userCode.FAIL_USER_NO_LOGIN,
            data: null,
            code: 'FAIL_USER_NO_LOGIN',
        }
        let session = ctx.session
        if (session && session.isLogin === true) {
            result.success = true
            result.message = ''
            result.code = ''
        }
        return result
    }
}
module.exports = userController