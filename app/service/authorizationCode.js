/**
 * Created by bear on 2017/12/2.
 */
module.exports = app => {
    class AuthorizationCode extends app.Service {
        async saveAuthorizationCode(code, client, user) {
            const result = await this.ctx.model.AuthorizationCode.create({
                code: code.authorizationCode,
                expiresAt: code.expiresAt,
                redirectUri: code.redirectUri,
                scope: code.scope || '',
                clientId: client.id,
                userId: user.id
            });
            return result;
        }
        async queryAuthorizationCode(params){
            const result = await this.ctx.model.AuthorizationCode.find({params});
            return result;
        }
        async delAuthorizationCode(code){
            const result = await this.ctx.model.AuthorizationCode.remove({code:code});
            return result;
        }
    }

    return AuthorizationCode;
};
