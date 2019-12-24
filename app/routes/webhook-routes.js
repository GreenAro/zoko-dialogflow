const Router = require("koa-router");
const tyntecMessageController = require("../controllers/webhook-tyntec");

const router = new Router();

// router.post(
//   "/v1/tyntec/webhook/incmsg",
//   tyntecMessageController.incomingMessage
// );

router.post("/v1/bot/dialogflow", tyntecMessageController.diaglogFlowHandler);

module.exports = router;
