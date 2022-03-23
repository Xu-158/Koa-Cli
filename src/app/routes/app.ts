import { Context } from "koa";
import Router from "koa-router";
import AppController from "../controllers/app";

const routerInit = new Router({ prefix: "/v1/app" });

routerInit.post("/test", AppController.test);

routerInit.get("/test", (ctx: Context) => {
  ctx.body = "asd";
});

export default routerInit;
