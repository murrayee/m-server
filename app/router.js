"use strict";
console.log(process.env);
module.exports = app => {
  // init
  app.get("/", app.controller.home.index);
  // OAuth2 controller test
  app.get("/oauth2", app.controller.oauth.authorize);
  app.all("/oauth2/token", app.oAuth2Server.token(), "oauth.token"); // 获取token
  app.all("/oauth2/authorize", app.oAuth2Server.authorize()); // 获取授权码
  app.all(
    "/oauth2/authenticate",
    app.oAuth2Server.authenticate(),
    "oauth.authenticate"
  ); // 验证请求

  // socket server api
  app.io.route("chat", app.io.controller.chat.index);
  app.io.route("message", app.io.controller.chat.message);
  app.io.route("user:online", app.io.controller.chat.online);
  // restful api
  app.post(
    "/api/users/login",
    app.oAuth2Server.token(),
    app.controller.users.login
  );
  app.post("/api/users/register", app.controller.users.register);
  app.post("/api/users/logout", app.controller.users.logout);
  app.get("/api/users", app.controller.users.index);
  app.get(
    "/api/users/profile/:userId",
    app.oAuth2Server.authenticate(),
    app.controller.users.profile
  );
  app.put(
    `/api/users/:userId/:field`,
    app.oAuth2Server.authenticate(),
    app.controller.users.modify
  );
  app.router.resources(
    "topics",
    "/api/topics",
    app.oAuth2Server.authenticate(),
    app.controller.topics
  );

  // spider api
  app.get("/api/spider/dy/feed", app.controller.spider.index);
};
