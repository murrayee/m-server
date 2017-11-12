/**
 * Created by bear on 2017/7/17.
 */
const msgModel = require("./models/msg").msgModel;

//TODO   redis 消息缓存  暂时用是mongodb数据库代替
const msgDao = {
    /**
     * 获取当前用户下 对应用消息列表
     * @param payload
     * @returns {Promise.<void>}
     */


    async  getList(payload){
        "use strict";
        let res = null;
        let query = msgModel.find({
            sendName: payload.sendName,
            receiveName: payload.receiveName
        }).sort({createTime: 1}).skip((payload.page - 1) * 10).limit(10);
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
     *用户消息存储
     * @param payload
     * @param socket
     * @returns {Promise.<void>}
     */
    async msgSave(socket, payload){
        "use strict";
        let res = null
        socket.to(payload.receiveName).emit('message', payload);
        await  msgModel.create({
            sendName: payload.sendName,
            receiveName: payload.receiveName,
            content: payload.content

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
     * 消息清除
     * @param payload
     * @returns {Promise.<void>}
     */
    async clear(payload){
        "use strict";
        let res = null
        let query = msgModel.remove({
            sendName: payload.sendName,
            receiveName: payload.receiveName
        })

        await  query.exec(function (err, data) {

            if (data.ok == 1) {
                res = 'true'
            } else {

                res = 'false'
            }

        })
        return res
    },

};


module.exports = msgDao