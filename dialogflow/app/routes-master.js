const combineRouters = require("koa-combine-routers");
const messageRoutes = require("./routes/webhook-routes");

const router = combineRouters(messageRoutes);

module.exports = router;
