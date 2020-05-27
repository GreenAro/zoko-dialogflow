const Router = require("koa-router");
const messageHandler = require("../controllers/webhook");

const router = new Router();

router.post("/v1/bot/dialogflow", messageHandler.diaglogFlowHandler);

module.exports = router;
