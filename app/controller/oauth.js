
const Controller = require('egg').Controller;

class OAuth2Controller extends Controller {

    // 登录页
    async authorize() {
        const query = this.ctx.querystring
        await this.ctx.render('home/index.html', {query: query})
    }

    // 认证过的请求 处理授权逻等~
    async authenticate() {
        // const accessToken=this.ctx.request.header['authorization'].replace('Bearer ','');
        this.ctx.body = {
            msg: 'ok!'
        }
    }
    // 返回token
    async token(){
        this.ctx.body = this.ctx.state.oauth.token
    }
}

module.exports = OAuth2Controller;