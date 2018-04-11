/**
 * Created by bear on 2018/3/2.
 */
'use strict';
const Controller = require('egg').Controller;
class TopicsController extends Controller {
  async index() {
    const { size, num } = this.ctx.query;
    const result = await this.service.topics.index(Number(size), Number(num));
    this.ctx.body = result;
    this.status = 200;
  }
  async show() {
    const result = await this.service.topics.show(this.ctx.params);
    this.ctx.body = result;
    this.status = 200;
  }
  async create() {
    const parmas = this.ctx.request.body;
    const result = await this.service.topics.create(parmas);
    this.ctx.body = result;
    this.status = 200;
  }
  async update() {
    this.ctx.body = this.ctx.request.body;
    this.status = 200;
  }
  async destroy() {
    this.ctx.body = { data: '注销' };
    this.status = 200;
  }
}
module.exports = TopicsController;
