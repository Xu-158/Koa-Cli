import { logger } from "./logger";
import { Context, Next } from "koa";

// 这个middleware处理在其它middleware中出现的异常
// 并将异常消息回传给客户端：{ code: '错误代码', msg: '错误信息' }
export const errorHandler = (ctx: Context, next: Next) => {
  return next().catch((err) => {
    if (err.code == null) {
      logger.error(err.stack);
    }
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = "Protected resource, use Authorization header to get access\n";
    } else {
      ctx.body = {
        code: err.code || -1,
        data: null,
        msg: err.message.trim() || "失败",
      };
      // 保证返回状态是 200, 这样前端不会抛出异常
      ctx.status = 200;
    }
    return Promise.resolve();
  });
};
