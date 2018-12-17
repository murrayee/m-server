/**
 * Created by bear on 2018/3/2.
 */
'use strict';
const Controller = require('egg').Controller;
class DouyinController extends Controller {
  async index() {
    const result = await this.service.douyin.index();
    this.ctx.body = result;
    this.status = 200;
  }
}
module.exports = DouyinController;
