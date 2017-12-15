import * as restify from 'restify';
import {RequestHandler, Server} from 'restify';
import * as corsMiddleware from 'restify-cors-middleware';
import {Options} from 'restify-cors-middleware';
import {CONTROLLERS} from '../controllers';
import {HttpServer} from './httpServer';

export class ApiServer implements HttpServer {
  private _restify: Server;

  public start(port: number): void {
    this._restify = restify.createServer();
    this._addCors();
    this._setupControllers();

    this._restify.listen(port, () => console.log('Up and running on port 9090'));
  };


  public get(url: string, requestHandler: RequestHandler): void {
    this._addRoute('get', `api${url}`, requestHandler);
  }

  public post(url: string, requestHandler: RequestHandler): void {
    this._addRoute('post', `api${url}`, requestHandler);
  }

  public del(url: string, requestHandler: RequestHandler): void {
    this._addRoute('del', `api${url}`, requestHandler);
  }

  public put(url: string, requestHandler: RequestHandler): void {
    this._addRoute('put', `api${url}`, requestHandler);
  }

  private _addCors(): void {
    const cors = corsMiddleware({} as Options);
    this._restify.pre(cors.preflight)
      .use(cors.actual)
      .use(restify.plugins.queryParser())
      .use(restify.plugins.bodyParser());

  }

  private _addRoute(method: 'get' | 'post' | 'put' | 'del', url: string, requestHandler: RequestHandler): void {
    this._restify[method](url, async (req, res, next) => {
      try {
        await requestHandler(req, res, next);
      }
      catch (e) {
        console.log(e);
        res.send(500, e);
      }
    });
    console.log(`Added route ${method.toUpperCase()} ${url}`);
  }

  private _setupControllers(): void {
    CONTROLLERS.forEach(controller => controller.setup(this));
  }
}

