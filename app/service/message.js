/**
 * Created by bear on 2017/12/2.
 */
const uuid = require('uuid');
module.exports = app => {
  class MessageService extends app.Service {
    async index() {
      const article = await this.ctx.model.Message.find({});
      const result = article;
      return result;
    }

    async sendPeerMessage(params) {
      const to = await this.service.users.profile(params.to._id);
      params.uuid = params.uuid || uuid.v4();
      const user = to[0];
      if (user.onlineStatus === 'online' && user.socketId) {
        console.log('发送在线消息！' + user.socketId);
        this.ctx.socket.to(user.socketId).emit('message', params);
      } else {
        console.log('发送离线消息！' + user.socketId);
        const serialParams = [params].map(i => JSON.stringify(i));
        app.redis.rpush(`offline:queue:userId:${user._id}`, ...serialParams);
      }
    }
  }

  return MessageService;
};
