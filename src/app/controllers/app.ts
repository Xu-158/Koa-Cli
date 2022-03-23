import { Context } from "koa";

export default class UserController {
  /**
   * 获取应用列表
   * @param {Context} ctx
   * @memberof UserController
   */
  public static async test(ctx: Context) {
    ctx.response.body = `<h1>123</h1>`;
  }
}
