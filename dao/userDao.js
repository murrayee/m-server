/**
 * Created by bear on 2017/7/17.
 */
const userModel = require("./models/user").userModel;


const userDao = {
    /**
     * 判断用户名是否存在
     * @param username
     * @returns {Promise.<void>}
     */
    async  isUse(username){
        "use strict";
        let res = null;
        let query = userModel.find({
            username: username
        });
        await query.exec(function (err, data) {
            // console.log(data)
            if (data && data.length > 0) {

                res = data[0]
            }
            else {

                res = null
            }
        })
        return res
    },
    /**
     * 用户登录操作
     * @param formData
     * @returns {Promise.<void>}
     */
    async login(formData){
        "use strict";
        let query = userModel.find({
            username: formData.username,
            password: formData.password
        }, {
            __v: 0
        })
        let res = null;
        await  query.exec(function (err, data) {
            // console.log( typeof  data)

            if (data && data.length > 0) {

                res = data[0]
            }
            else {

                res = null
            }
        })
        return res
    },
    /**
     *用户注册操作
     * @param formData
     * @returns {Promise.<void>}
     */
    async reg(formData){
        "use strict";
        let res = null
        await  userModel.create({
            username: formData.username,
            password: formData.password,
            CN: formData.CN
        }, function (err, data) {
            console.log(data)
            if (data) {

                res = data
            }
            else {

                res = null
            }
        })
        return res
    },
    /**
     * 用户修改密码操作
     * @param formData
     * @returns {Promise.<void>}
     */
    async update(formData){
        "use strict";
        let res = null
        let query = userModel.find({
            username: formData.username
        }).update(
            {}, {$set: {password: formData.password}})
        await  query.exec(function (err, data) {
            if (data.ok == 1) {
                res = 'true'
            } else {

                res = 'false'
            }

        })
        return res
    },
    /**
     * 获取用户信息
     * @param username
     * @returns {Promise.<void>}
     */
    async getUserInfo(username){
        "use strict";
        let res = null;

        let query = userModel.find({
            username: username
        }, {
            __v: 0
        })

        await  query.exec(function (err, data) {
            if (Array.isArray(data) && data.length > 0) {
                res = data[0]
            } else {
                res = null
            }

        })
        return res
    },

    /**
     * 获取所有用户
     * @returns {Promise.<void>}
     */
    async getAll(){
        "use strict";
        let res = null;

        let query = userModel.find({})

        // let query = userModel.find({}, {
        //     __v: 0
        // })

        await  query.exec(function (err, data) {
            if (Array.isArray(data) && data.length > 0) {
                res = data
            } else {
                res = []
            }

        })

        console.log(res)
        return res
    },

};


module.exports = userDao