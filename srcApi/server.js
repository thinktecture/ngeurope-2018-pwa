'use strict';

const restify = require('restify'),
  corsMiddleware = require('restify-cors-middleware'),
  pushController = require('./controllers/push');

const start = () => {
  const server = restify.createServer({});
  const cors = corsMiddleware({});

  server.pre(cors.preflight)
    .use(cors.actual)
    .use(restify.queryParser())
    .use(restify.bodyParser());

  pushController.setup(server);

  server.listen(9090, () => console.log('Up and running on port 9090'));
};

module.exports = { start };
