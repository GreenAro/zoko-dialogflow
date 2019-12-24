const Koa = require('koa');
const cors = require('@koa/cors');
const body = require('koa-body');

const config = require('./app/config');
const router = require('./app/routes-master');
const logger = require('./app/logger');

const app = new Koa(); 
app.use(body({ multipart: true }));
app.use(
    cors({
      origin: '*',
      allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
      exposeHeaders: ['X-Request-Id']
    })
);
app.use(router());

module.exports = app.listen(config.port, config.host, () => {
    logger.info(`API server listening on ${config.host}:${config.port}, in ${config.env}`);
    logger.info(`Node ENV : ${process.env.NODE_ENV}`);
});