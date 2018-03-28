/**
 * Created by bear on 2018/3/2.
 */
'use strict';
const Controller = require('egg').Controller;
class UserController extends Controller {
  async index() {
    const result = await this.service.users.index();
    this.ctx.body = result;
    this.status = 200;
  }
  async show() {
    // let result=await this.service.users.index()
    this.ctx.body = {
      name: `${this.ctx.params.id} show`,
    };
    this.status = 200;
  }
  async create() {
    // let result=await this.service.users.index()
    this.ctx.body = `body: ${JSON.stringify(this.ctx.request.body)} create`;
    this.status = 200;
  }

  async update() {
    this.ctx.body = {
      id: `${this.ctx.params.id} update`,
    };
    this.status = 200;
  }

  async destroy() {
    this.ctx.body = {
      id: `${this.ctx.params.id} destroy`,
    };
    this.status = 200;
  }
}
module.exports = UserController;
