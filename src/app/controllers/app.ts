import { Context } from "koa";
import Joi from "joi";
import updateInfo from "../db/updateInfo";
import { loggerFeedback } from "../middlewares/logger";

export default class UserController {
  public static getUpdateInfo(ctx: Context) {
    ctx.status = 200;
    const { title, content } = updateInfo;
    ctx.body = ctx.body = {
      code: 0,
      msg: "查询成功",
      data: { title, content },
    };
  }

  public static async postFeedback(ctx: Context) {
    const request: any = ctx.request.body;
    const schema = Joi.object({
      data: Joi.string().required(),
      // data: Joi.string().empty(''),
    });
    try {
      await schema.validateAsync(request);
      const remoteAddress = ctx.headers["x-forwarded-for"] || ctx.ip || ctx.ips;
      loggerFeedback.info(`${remoteAddress} -- ${request.data}`);
      ctx.status = 200;
      ctx.body = ctx.body = {
        code: 0,
        msg: "添加成功!",
        data: ctx.body,
      };
    } catch (error) {
      ctx.body = {
        code: -1,
        msg: error.message || "查询失败",
      };
    }
  }
}
