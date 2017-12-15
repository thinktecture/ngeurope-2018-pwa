import {ApiServer} from './server/apiServer';

const server = new ApiServer();
server.start(+process.env.PORT || 9090);
