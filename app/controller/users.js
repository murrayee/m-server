'use strict';
const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    let result = await this.service.users.index();
    let response = {
      success: false,
      message: '',
    };
    if (result && result.length > 0) {
      response = {
        ...response,
        success: true,
        message: '获取列表成功!',
        data: result,
      };
    } else {
      response = {
        ...response,
        message: '暂无列表信息！',
        data: null,
      };
    }
    this.ctx.body = response;
    this.status = 200;
  }

  async authorize() {
    let result = this.ctx.state.oauth.token;
    let response = {
      success: false,
      message: '',
    };
    if (result) {
      response = {
        success: true,
        message: '登录成功',
        accessToken: result.accessToken,
        accessTokenExpiresAt: result.accessTokenExpiresAt,
        refreshToken: result.refreshToken,
        refreshTokenExpiresAt: result.refreshTokenExpiresAt,
        // client: {id: result.client.id},
        data: result.user,
      };
    } else {
      response = {
        message: '登录失败,请检查您的用户名或者密码',
        data: null,
      };
    }
    this.ctx.body = { ...response };
    this.status = 200;
  }

  async register() {
    const params = Object.keys(this.ctx.request.body)[0];
    let result = await this.service.users.register(JSON.parse(params));
    let response = {
      success: false,
      message: '',
    };
    if (result && result._id) {
      response = {
        ...response,
        success: true,
        message: '注册成功！',
        data: result,
      };
    } else {
      response = {
        ...response,
        message: '注册失败！',
        data: null,
      };
    }
    this.ctx.body = response;
    this.status = 200;
  }

  async modify() {
    let params = this.ctx.request.body;

    let result = await this.service.users.modify(params);
    let response = {
      success: false,
      message: '',
    };
    if (result && result.ok && result.ok === 1) {
      response = {
        ...response,
        success: true,
        message: '更新用户信息成功！',
        data: result,
      };
    } else {
      response = {
        ...response,
        message: '更新用户信息失败！',
        data: null,
      };
    }
    this.ctx.body = response;
    this.status = 200;
  }

  async profile() {
    let params = this.ctx.params.userId;
    let result = await this.service.users.profile(params);
    let response = {
      success: false,
      message: '',
    };
    if (result && result.length > 0) {
      response = {
        ...response,
        success: true,
        message: '获取用户信息成功！',
        data: result[0],
      };
    } else {
      response = {
        ...response,
        message: '获取用户信息失败！',
        data: null,
      };
    }
    this.ctx.body = response;
    this.status = 200;
  }

  async logout() {
    const accessToken = this.ctx.request.header['authorization'].replace('Bearer ', '');

    const result = await  this.ctx.service.refreshToken.delRefreshToken(accessToken);

    this.ctx.body = result;

  }
}

module.exports = UserController;