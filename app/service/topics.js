/**
 * Created by bear on 2017/11/16.
 */
const Service = require('egg').Service;
const uuid = require('uuid');
class TopicsService extends Service {
  async index(size = 10, num = 0) {
    const result = await this.ctx.model.Topics.find({})
      .sort({ create_time: -1 })
      .skip(size * num)
      .limit(size);
    return result;
  }
  async create(params) {
    let schame = {
      user_id: params.user_id,
      topics_id: uuid.v4(),
      author: params.author,
      avatar: params.avatar,
      create_time: new Date().getTime(),
      title: params.title,
      relevant_img: params.relevant_img,
      abstract: params.abstract,
      praise_count: 0,
      review_count: 0,
      read_count: 0,
    };
    await this.ctx.model.Article.create({ ...schame, content: params.content });
    const result = await this.ctx.model.Topics.create({ ...schame });
    return result;
  }
  async show(params) {
    const result = await this.ctx.model.Article.find({ topics_id: params.id });
    return result;
  }
  async update(params) {
    
  }
}

module.exports = TopicsService;
