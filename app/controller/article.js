/**
 * Created by bear on 2017/12/2.
 */
const Controller = require('egg').Controller;

class MessageController extends Controller {

    async index() {

        let result=await this.service.message.index()

        this.ctx.body = result;

        this.status = 200;
    }
}

module.exports = MessageController;
