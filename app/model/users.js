/**
 * Created by bear on 2017/11/14.
 */

module.exports = app => {
    const mongoose = app.mongoose
    const userSchema = new mongoose.Schema({
        avatar: {type: String},
        username: {type: String},
        password: {type: String},
        firstLetter: {type: String, default: ""},
        phone: {type: String, default: ""},
        socketId: {type: String, default: ""},
        onlineStatus: {type: String, default: "offline"},
        vibration: {type: Boolean, default: true},
    });
    return  mongoose.model('Users', userSchema,'users');
}
