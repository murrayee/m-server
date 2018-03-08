/**
 * Created by bear on 2018/2/12.
 */
module.exports = app => {
    class Controller extends app.Controller {
        async index() {

            this.ctx.socket.emit('res', 'asdasd');
        }
        async message() {

            // modelMessage.sendPeerMessage(socket, payloads);
        }
        async online() {
            // modelMessage.sendOfflineMessage(socket, data.userId);
        }
    }
    return Controller
};
