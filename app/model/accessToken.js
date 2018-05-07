/**
 * Created by bear on 2017/11/14.
 * oauth2 ()
 */

module.exports = app => {
    const mongoose = app.mongoose;
    const AccessToken = new mongoose.Schema({
        accessToken: {type: String},
        accessTokenExpires: {type: Number},
        scope: {type: String},
        clientId: {type: String},
        userId: {type: String},
    });

    return mongoose.model('accessToken', AccessToken, 'accessToken');
};