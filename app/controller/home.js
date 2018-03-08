'use strict';
module.exports = app => {
    class HomeController extends app.Controller {
        async index() {
            await this.ctx.render('home/index.html');
        }
        async say() {
            app.io.sockets.emit('res', '哈哈哈哈哈大链接成功');
        }
    }
    return HomeController;
};
