/**
 * Created by bear on 2017/7/17.
 */
const mongoose = require("../database/database").mongoose;

const db = require("../database/database").db


const msgSchema = new mongoose.Schema({

    sendName: {type: String},
    receiveName: {type: String},
    content: {type: String},
    createTime: {type: String, default: new Date()}

});
const msgModel = db.model("message", msgSchema);


module.exports = {

    msgModel


}