const dialogFlowService = require("../services/dialogFlow/getIntent");
const response = require("../util/response");

exports.diaglogFlowHandler = async (ctx) => {
  const intent = dialogFlowService.getIntent(ctx.request.body);
  const result = dialogFlowService.sendReply(intent);
  response.sendResponse(ctx, 200, result);
};
