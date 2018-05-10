/**
 * Created by bear on 2017/11/14.
 * oauth2 ()
 */

module.exports = app => {
    const mongoose = app.mongoose;
    const AuthorizationCode = new mongoose.Schema({
        code: {type: String},
        accessTokenExpiresAt: {type: Date},
        redirectUri: {type: String},
        scope: {type: String},
        clientId: {type: String},
        userId: {type: String},
    });

    return mongoose.model('authorizationCode', AuthorizationCode, 'authorizationCode');
};