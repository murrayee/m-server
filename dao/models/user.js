/**
 * Created by bear on 2017/7/17.
 */
const mongoose = require("../database/database").mongoose;

const db = require("../database/database").db


const userSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    CN: {type: String,default:""},
    remember: {type: String,default:"false"},

});
const  userModel = db.model("user", userSchema);


module.exports={
    userModel
}