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
    async sendPeerMessage(parmas) {
      const user = await this.service.users.profile(parmas[0].to);
      // 补充消息内容
      parmas = parmas.map(payload => {
        payload.uuid = payload.uuid || uuid.v4();
        payload.ext.timestamp = +new Date();
        return payload;
      });
      if (user[0].onlineStatus === 'online' && user[0].socketId) {
        console.log('发送在线消息！' + user[0].socketId);
        this.ctx.socket.to(user[0].socketId).emit('message', parmas);
      } else {
        console.log('发送离线消息！' + user[0].socketId);
        const serialParmas = parmas.map(i => {
          return JSON.stringify(i);
        });
        app.redis.rpush(`offline:queue:userId:${user[0]._id}`, ...serialParmas);
      }
    }
  }

  return MessageService;
};
