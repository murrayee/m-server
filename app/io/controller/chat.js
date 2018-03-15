/**
 * Created by bear on 2018/2/12.
 */
module.exports = app => {
    class chatController extends app.Controller {
        async index() {
            this.ctx.socket.emit('res', 'asdasd');
        }
        async message() {
            const params = this.ctx.args[0]
            this.ctx.service.message.sendPeerMessage(params)
        }
        async online() {
            // modelMessage.sendOfflineMessage(socket, data.userId);
        }
    }
    return chatController
};
