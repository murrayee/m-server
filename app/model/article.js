/**
 * Created by bear on 2017/12/2.
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const articleSchema = new mongoose.Schema({
    user_id: { type: String },
    topics_id: { type: String },
    author: { type: String },
    avatar: { type: String },
    create_time: { type: Number },
    title: { type: String },
    abstract: { type: String },
    content: { type: String },
    relevant_img: { type: String },
    praise_count: { type: Number },
    review_count: { type: Number },
    read_count: { type: Number },
  });

  return mongoose.model('acticle', articleSchema, 'acticle');
};
