/**
 * Created by bear on 2017/7/17.
 */
const userDao=require("../dao/userDao")

const userCode =require('../utils/code')


const userService={

    /**
     * 查找用户名
     * @param username
     * @returns {Promise.<*>}
     */
    async isUse(username){
        "use strict";
        let data=await userDao.isUse(username)

        return data

    },
    /**
     * 查找所有用户
     * @returns {Promise.<*>}
     */
    async getAll(){
        "use strict";
        let data=await userDao.getAll()

        return data

    },
    /**
     * 用户登录操作
     * @param formData
     * @returns {Promise.<*>}
     */
    async login(formData){
        // console.log("服务层"+formData)
        "use strict";
        let data = await userDao.login(formData)
        // console.log(data)
        return data
    },
    /**
     * 用户注册操作
     * @param formData
     * @returns {Promise.<*>}
     */
    async reg(formData){
        "use strict";


        let data = await userDao.reg(formData)
        // console.log("da"+data)
        return data
    },
    /**
     * 用户修改密码操作
     * @param formData
     * @returns {Promise.<*>}
     */
    async update(formData){
        "use strict";

        let data = await userDao.update(formData)

        return data
    },
    /**
     * 查找用户信息
     * @param formData
     * @returns {Promise.<*>}
     */
    async getUserInfo(formData){
        "use strict";

        let data = await  userDao.getUserInfo(formData)

        return data
    },

    /**
     * 校验用户数据
     * @param formData
     * @returns {{success: boolean, message: string}}
     */
    validator( formData ) {
        let result = {
            success: false,
            message: '',
        }

        // if ( /[]{2,16}/.test(formData.username) === false ) {
        // if ( /[a-z0-9\_\-]{6,16}/.test(formData.username) === false ) {
        //     result.message = userCode.ERROR_USER_NAME
        //     return result
        // }

        if ( !/[\w+]{6,16}/.test( formData.password )  ) {
            result.message = userCode.ERROR_PASSWORD
            return result
        }
        // if ( formData.password !== formData.confirmPassword ) {
        //     result.message = userCode.ERROR_PASSWORD_CONFORM
        //     return result
        // }

        result.success = true

        return result
    }

}


module.exports= userService
