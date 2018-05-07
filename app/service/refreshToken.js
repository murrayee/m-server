/**
 * Created by bear on 2017/12/2.
 */

module.exports = app => {
    class RefreshToken extends app.Service {
        async saveRefreshToken(token, client, user) {

            const result = await this.ctx.model.RefreshToken.create({
                refreshToken: token.refreshToken,
                refreshTokenExpiresAt: token.refreshTokenExpiresAt,
                clientId: client.id,
                userId: user.id,
                scope: token.scope || ''
            });
            return result ;
        }
        async delRefreshToken(token){
            const result = await this.ctx.model.RefreshToken.remove({
                refreshToken:token
            });
            return result ;
        }
        async queryRefreshToken(refreshToken){

            const result = await this.ctx.model.RefreshToken.find({
                refreshToken:refreshToken
            });
            return result ;
        }
    }

    return RefreshToken;
};
