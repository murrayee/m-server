'use strict';

module.exports = app => {

    app.get('/', app.controller.home.index);
    app.router.resources('topics', '/api/topics', app.controller.topics);
    app.get('/api/users', app.controller.users.index)
    app.get('/api/users/profile/:userId', app.controller.users.profile)
    app.post('/api/users/authorize', app.controller.users.authorize)
    app.post('/api/users/register', app.controller.users.register)
    app.put(`/api/users/:userId/:field`, app.controller.users.modify)
    // app.io.of('/chat').route('chat', app.io.controller.chat.index);
    app.io.route('chat', app.io.controller.chat.index);
    app.io.route('message', app.io.controller.chat.message);
    app.io.route('user:online', app.io.controller.chat.online);


};
