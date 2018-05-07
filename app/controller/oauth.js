
const Controller = require('egg').Controller;

class OAuth2Controller extends Controller {

    // 登录页
    async authorize() {
        const query = this.ctx.querystring
        await this.ctx.render('home/index.html', {query: query})
    }

    // 认证过的请求
    async authenticate() {
        this.ctx.body = {
            msg: 'successed!'
        }
    }

    // 返回token
    async token(){
        this.ctx.body = this.ctx.state.oauth.token
    }
}

module.exports = OAuth2Controller;