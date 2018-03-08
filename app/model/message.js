/**
 * Created by bear on 2017/12/2.
 */
module.exports = app => {

    const mongoose = app.mongoose

    const msgSchema = new mongoose.Schema({
        title: {type: String},
        content: {type: String},
        // createTime: new Date(),
        auth: {type: String},
    });

    return  mongoose.model('Message', msgSchema,'message');
}
