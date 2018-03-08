'use strict';
module.exports = {
    mongoose: {
        enable: true,
        package: 'egg-mongoose',
    },
    cors: {
        enable: true,
        package: 'egg-cors',
    },
    redis: {
        enable: true,
        package: 'egg-redis',
    },
    io: {
        enable: true,
        package: 'egg-socket.io',
    },
    nunjucks: {
        enable: true,
        package: 'egg-view-nunjucks'
    }

}
