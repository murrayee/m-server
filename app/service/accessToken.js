/**
 * Created by bear on 2017/12/2.
 */
module.exports = app => {
    class AccessToken extends app.Service {
        async getAccessToken(bearerToken) {
            const result = await this.ctx.model.AccessToken.find({accessToken: bearerToken});
            return result;
        }
        async saveAccessToken(token, client, user){
            const result = await this.ctx.model.AccessToken.create({
                accessToken: token.accessToken,
                accessTokenExpiresAt: token.accessTokenExpiresAt,
                clientId: client.id,
                userId: user.id,
                scope: token.scope || ''
            });
            return result;
        }
    }

    return AccessToken;
};
