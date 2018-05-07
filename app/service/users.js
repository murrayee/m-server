/**
 * Created by bear on 2017/11/16.
 */
const Service = require('egg').Service;
const pinyin = require('pinyin');

class UsersService extends Service {
  async index() {
    const result = await this.ctx.model.Users.find({}).sort({ firstLetter: 1 });
    return result;
  }
  async authorize(params) {
    console.log(params,'=========')
    const result = await this.ctx.model.Users.find({
      username: params.username,
      password: params.password,
    });
    return result;
  }

  async profile(params) {
    const result = await this.ctx.model.Users.find({
      _id: params,
    });

    return result;
  }

  async register(params) {
    const { baseDir } = this.ctx.app;
    const avatarFileName = this.ctx.helper.createFileName();
    await this.ctx.helper.getAvatar(
      baseDir,
      avatarFileName,
      params.username.substring(0, 2)
    );

    const result = await this.ctx.model.Users.create({
      username: params.username,
      password: params.password,
      avatar: `http://127.0.0.1:9090/public/avatar/${avatarFileName}.png`,
      firstLetter: this.getNameFirstLetter(params.username) || '',
    });
    return result;
  }

  async modify(params) {
    const { userId, field, value } = params;
    if (!~[ 'name', 'socketId', 'vibration' ].indexOf(field)) {
    }
    if (field === 'name') {
      return await this.ctx.model.Users.update(
        { _id: userId },
        {
          $set: {
            [field]: value,
            firstLetter: this.getNameFirstLetter(value) || '',
          },
        }
      );
    }
    if (field === 'socketId') {
      return await this.ctx.model.Users.update(
        { _id: userId },
        { $set: { [field]: value, onlineStatus: 'online' } }
      );
    }
    if (field === 'vibration') {
      return await this.ctx.model.Users.update(
        { _id: userId },
        { $set: { [field]: value } }
      );
    }
  }

  getNameFirstLetter(name) {
    const result = pinyin(name[0]);
    return result[0][0][0].toUpperCase();
  }
}

module.exports = UsersService;
