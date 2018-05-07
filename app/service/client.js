/**
 * Created by bear on 2017/12/2.
 */

module.exports = app => {
    class Client extends app.Service {
        async getClient(clientId, clientSecret) {
            let params={clientId:clientId};
            if(clientSecret){
                params={...params,clientSecret:clientSecret}
            }
            const result = await this.ctx.model.Client.find({...params});
            return result;
        }
        async add (fields){

            const result = await this.ctx.model.Client.create({...fields});
            return result

        }
    }

    return Client;
};
