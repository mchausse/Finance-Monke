import express from 'express';
import cors from 'cors';
import transactionRoutes from './src/routes/transactions';
import userRoutes from './src/routes/users';
import authRoutes from './src/routes/auth';

const path = __dirname + '/views/';
const corsOptions = {
  origin: "http://localhost:3001"// maybe 3000 || 3001 for the API
};
// Creates and configures an ExpressJS web server.
class App {
  public expressApp: express.Application;
  private BASE_API =  '/api/v1';

  constructor() {
    this.expressApp = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.expressApp.use(express.json() as express.RequestHandler);
    this.expressApp.use(express.urlencoded({ extended: true }) as express.RequestHandler);
    this.expressApp.use(express.static(path) as express.RequestHandler);
    if(this.isInProd()){
      this.expressApp.use(cors(corsOptions));
    }else{
      this.expressApp.use(cors());
    }
  }

  private isInProd(){
    return process.env.NODE_ENV.trim() === 'production';
  }

  private routes(): void {
    const router = express.Router();
    router.get('/', (req, res, next) => {
        res.sendFile(path + "index.html");
    });

    this.expressApp.use('/', router)
    this.expressApp.use(this.BASE_API, transactionRoutes.route)
    this.expressApp.use(this.BASE_API, userRoutes.route)
    this.expressApp.use(this.BASE_API, authRoutes.route)
  }

}

export default new App().expressApp;
