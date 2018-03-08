/**
 * Created by bear on 2018/2/12.
 */
module.exports = app=> {
    return async (ctx, next) => {
        // const say = await ctx.service.user.say();
        // ctx.socket.emit('res', 'auth!' + say);
        console.log('connect!');
        await next();
        console.log('disconnect!');

    };
};