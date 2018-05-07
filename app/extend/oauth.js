'use strict';

module.exports = app => {
  class Model {
    constructor(ctx) {
      this.ctx = ctx;
    }
    async getClient(clientId, clientSecret) {
      try {
        console.log('getClient invoked.......');
        const client = await this.ctx.service.client.getClient(
          clientId,
          clientSecret
        );
        if (!client) return false;
        return {
          id: client.clientId,
          redirectUris: client.redirectUri.split(','),
          grants: client.grants.split(','),
        };
      } catch (err) {
        return false;
      }
    }
    async getUser(username, password) {
      try {
        console.log('getUser invoked.......');
        const user = await this.ctx.service.user.params({username, password});
        return user;
      } catch (err) {
        return false;
      }
    }
    async getAccessToken(bearerToken) {
      try {
        const token = await this.ctx.service.accessToken.getAccessToken(
          bearerToken
        );
        if (!token) return;
        return {
          accessToken: token.accessToken,
          accessTokenExpiresAt: token.accessTokenExpiresAt,
          scope: token.scope,
          client: {
            id: token.clientId,
          },
          user: {
            id: token.userId,
          },
        };
      } catch (err) {
        return false;
      }
    }
    async saveToken(token, client, user) {
      try {
        await this.ctx.service.accessToken.saveAccessToken(token, client, user);
        await this.ctx.service.refreshToken.saveRefreshToken(token, client, user);
        return {
          accessToken: token.accessToken,
          accessTokenExpiresAt: token.accessTokenExpiresAt,
          refreshToken: token.refreshToken,
          refreshTokenExpiresAt: token.refreshTokenExpiresAt,
          client: { id: client.id },
          user,
        };
      } catch (err) {
        return false;
      }
    }
    async revokeToken(token) {
      try {
        return await this.ctx.service.refreshToken.delRefreshToken(token);
      } catch (err) {
        return false;
      }
    }
    async getAuthorizationCode(authorizationCode) {
      try {
        console.log('authorizationCode: ', authorizationCode);
        const authCode = await this.ctx.service.authorizationCode.queryAuthorizationCode(
          {
            code: authorizationCode,
          }
        );
        if (!authCode) return;
        const user = await this.ctx.service.user.profile(authCode.userId);
        if (!user) return;
        return {
          code: authCode.code,
          expiresAt: authCode.expiresAt,
          redirectUri: authCode.redirectUri,
          scope: authCode.scope,
          client: { id: authCode.clientId },
          user,
        };
      } catch (err) {
        return false;
      }
    }
    async saveAuthorizationCode(code, client, user) {
      try {
        await this.ctx.service.authorizationCode.saveAuthorizationCode(
          code,
          client,
          user
        );
        return {
          authorizationCode: code.authorizationCode,
          expiresAt: code.expiresAt,
          redirectUri: code.redirectUri,
          scope: code.scope,
          client: { id: client.id },
          user: { id: user.id },
        };
      } catch (err) {
        return false;
      }
    }
    async revokeAuthorizationCode(code) {
      try {
        return await this.ctx.service.authorizationCode.delAuthorizationCode;
      } catch (err) {
        return false;
      }
    }

    async getRefreshToken(refreshToken) {
      try {
        const refToken = await this.ctx.service.refreshToken.queryRefreshToken(
          refreshToken
        );
        if (!refToken) return;
          const user = await this.ctx.service.user.profile(refToken.userId);
        if (!user) return;
        return {
          refreshToken: refToken.refreshToken,
          refreshTokenExpiresAt: refToken.refreshTokenExpiresAt,
          scope: refToken.scope,
          client: { id: refToken.clientId }, // with 'id' property
          user,
        };
      } catch (err) {
        return false;
      }
    }
  }
  return Model;
};
