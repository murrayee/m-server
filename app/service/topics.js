/**
 * Created by bear on 2017/11/16.
 */
const Service = require('egg').Service;

class TopicsService extends Service {
  async index(size = 10, num = 0) {
    console.log(size, num);
    const result = await this.ctx.model.Topics.find({})
      .sort({ create_time: 1 })
      .skip(size * num)
      .limit(size);
    return result;
  }
}

module.exports = TopicsService;
