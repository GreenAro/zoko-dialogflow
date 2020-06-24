const Router = require("koa-router");
const messageHandler = require("../controllers/webhook");

const router = new Router();

router.post("/v1/bot/dialogflow", messageHandler.diaglogFlowHandler);
router.post("/v1/bot/webhookTest", messageHandler.webhookHandler);

module.exports = router;
