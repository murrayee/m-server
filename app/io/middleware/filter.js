/**
 * Created by bear on 2018/2/12.
 */
module.exports = (app) => {
    return async (ctx, next) => {
        // console.log(ctx.packet);
        await next();
        // console.log('packet response!');
    };
};