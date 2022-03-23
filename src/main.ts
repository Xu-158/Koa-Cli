import Koa from "koa";
import BodyParser from "koa-bodyparser";
import Cors from "koa2-cors";
import Static from "koa-static";
import Path from "path";
import AddressIP from "ip";
import { PORT } from "./app/config/constant";
import { errorHandler } from "./app/middlewares/error";
import { loggerMiddleware } from "./app/middlewares/logger";
import { corsHandler } from "./app/middlewares/cors";
import { responseHandler } from "./app/middlewares/response";
import AppRoute from "./app/routes/app";

const source = Static(`${Path.join(__dirname)}/public`);

const app = new Koa();

// Logger
app.use(loggerMiddleware);

// Error Handler
app.use(errorHandler);

// ctx.body
app.use(BodyParser());

// Cors
app.use(Cors(corsHandler));

// static
app.use(source);
app.use(AppRoute.routes()).use(AppRoute.allowedMethods());
// 调用router.allowedMethods()获得一个中间件，当发送了不符合的请求时，会返回 `405 Method Not Allowed` 或 `501 Not Implemented`

// Response Handler
app.use(responseHandler);

app.listen(PORT, () => {
  console.log(`http://${AddressIP.address()}:${PORT} 已启动`);
});

module.exports = app;
