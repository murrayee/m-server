/**
 * Created by bear on 2018/2/12.
 */
module.exports = (app) => {
    return async (ctx, next) => {
        // console.log(ctx.packet);
        // const say = await ctx.service.users.say();
        // ctx.socket.emit('res', 'packet!' + say);
        await next();
        console.log('packet response!');
    };
};