/**
 * Created by bear on 2017/12/2.
 */


const Service = require('egg').Service;


class MessageService extends Service {
    async index() {
        let article = await this.ctx.model.Message.find({})
        let result = article
        return result
    }
}


module.exports = MessageService;