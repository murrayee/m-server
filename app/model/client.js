/**
 * Created by bear on 2017/11/14.
 * oauth2 ()
 */

module.exports = app => {
    const mongoose = app.mongoose;
    const Client = new mongoose.Schema({
        clientId: {type: String},
        clientSecret: {type: String},
        redirectUri: {type: String},
        grants: {type: String},
    });

    return mongoose.model('client', Client, 'client');
};