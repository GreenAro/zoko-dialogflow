
module.exports.sendResponse = (ctx,statusCode,body) => {
    ctx.response.status = statusCode;
    ctx.response.body = body;
    return;
}