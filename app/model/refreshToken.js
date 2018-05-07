/**
 * Created by bear on 2017/11/14.
 * oauth2 ()
 */

module.exports = app => {
    const mongoose = app.mongoose;
    const RefreshToken = new mongoose.Schema({
        refreshToken: {type: String},
        refreshTokenExpires: {type: Number},
        scope: {type: String},
        clientId: {type: String},
        userId: {type: String},
    });

    return mongoose.model('refreshToken', RefreshToken, 'refreshToken');
};