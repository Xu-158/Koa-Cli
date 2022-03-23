import { Context, Next } from "koa";

// 这个middleware用于将ctx.result中的内容最终回传给客户端
// 回传的格式遵循这样的格式：{ code: 0, msg: any data: any }
export const responseHandler = async (ctx: Context, next: Next) => {
  console.log('ctx: ', ctx);
  if (ctx.result !== undefined) {
    ctx.type = "json";
    ctx.body = {
      code: 200,
      msg: ctx.msg || "成功",
      data: ctx.result,
    };
    await next();
  }
};