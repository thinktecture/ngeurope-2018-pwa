import {HttpServer} from '../server/httpServer';

export interface BaseController {
  setup(httpServer: HttpServer);
}
