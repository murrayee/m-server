/**
 * Created by bear on 2017/12/3.
 */
module.exports = () => {
  return async function uppercase(ctx, next) {
    ctx.query.name = ctx.query.name && ctx.query.name.toUpperCase();
    await next();
  };
};
