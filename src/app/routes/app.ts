import Router from "koa-router";
import AppController from "../controllers/app";

const routerInit = new Router({ prefix: "/v1/app" });

routerInit.get("/getUpdateInfo", AppController.getUpdateInfo);

routerInit.post("/feedback", AppController.postFeedback);

export default routerInit;
