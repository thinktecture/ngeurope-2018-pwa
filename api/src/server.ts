import * as restify from 'restify';
import {PushController} from './controllers/push';
import * as corsMiddleware from 'restify-cors-middleware';
import {Options} from 'restify-cors-middleware';

export class ApiServer {
  public start() {
    const server = restify.createServer({});
    const cors = corsMiddleware({} as Options);

    server.pre(cors.preflight)
      .use(cors.actual)
      .use(restify.plugins.queryParser())
      .use(restify.plugins.bodyParser());

    const pushController = new PushController();
    pushController.setup(server);

    server.listen(9090, () => console.log('Up and running on port 9090'));
  };
}

