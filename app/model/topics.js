/**
 * Created by bear on 2017/12/2.
 */
module.exports = app => {
    const mongoose = app.mongoose
    const topicsSchema = new mongoose.Schema({
        author: {type: String},
        avatar: {type: String},
        create_time:{type:Number},
        title: {type: String},
        abstract: {type: String},
        relevant_img:{type:String},
        praise_count:{type:Number},
        review_count:{type:Number},
        read_count:{type:Number},
    });

    return mongoose.model('topics', topicsSchema, 'topics');
}
