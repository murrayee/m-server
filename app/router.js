'use strict';

module.exports = app => {

    // OAuth controller
    app.get('/oauth2', app.controller.oauth.authorize);
    app.all('/oauth2/token', app.oAuth2Server.token(), 'oauth.token');   // 获取token
    app.all('/oauth2/authorize', app.oAuth2Server.authorize());      // 获取授权码
    app.all('/oauth2/authenticate', app.oAuth2Server.authenticate(), 'oauth.authenticate');    // 验证请求


    // restApi
    app.get('/', app.controller.home.index);
    app.router.resources('topics', '/api/topics', app.controller.topics);
    app.get('/api/users', app.controller.users.index)
    app.get('/api/users/profile/:userId', app.controller.users.profile)
    app.post('/api/users/authorize', app.controller.users.authorize)
    app.post('/api/users/register', app.controller.users.register)
    app.put(`/api/users/:userId/:field`, app.controller.users.modify)
    app.io.route('chat', app.io.controller.chat.index);
    app.io.route('message', app.io.controller.chat.message);
    app.io.route('user:online', app.io.controller.chat.online);


};
