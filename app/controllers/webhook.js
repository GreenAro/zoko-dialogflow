const moment = require("moment");
const dialogFlowService = require("../services/dialogFlow/getIntent");
const response = require("../util/response");

exports.diaglogFlowHandler = async (ctx) => {
  const intent = await dialogFlowService.getIntent(ctx.request.body);
  console.log("intent - ", intent);
  const result = await dialogFlowService.sendSimpleReply(intent);
  console.log("RESULT - ", result);
  response.sendResponse(ctx, 200, result);
};

exports.webhookHandler = async (ctx) => {
  // console.log("Request - ", ctx.request.body);
  console.log(
    moment().toISOString() +
      " : Custome -> " +
      ctx.request.body.platformSenderId +
      "   Message: -> " +
      ctx.request.body.text
  );
  response.sendResponse(ctx, 200, "success");
};
