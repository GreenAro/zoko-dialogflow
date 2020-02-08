const dialogFlowService = require("../services/dialogFlow/getIntent");
const reponse = require("../util/response");
// const logger = require("../logger");


// different levels of loggers
// logger.info("info log");
// logger.debug("debug log");
// logger.silly("silly log");
// logger.warn("warn log");
// logger.error("error log");

// exports.incomingMessage = async ctx => {
//   const result = tyntecMessageService.incomingMessage(ctx.request.body);
//   reponse.sendResponse(ctx, 200, result);
// };

exports.diaglogFlowHandler = async ctx => {
  const result = dialogFlowService.getIntent(ctx.request.body);
  reponse.sendResponse(ctx, 200, result);
};
