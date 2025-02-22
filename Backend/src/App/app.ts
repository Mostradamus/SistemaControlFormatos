import express, { Express, Request, Response } from 'express';
import 'reflect-metadata'; 
import { RegisterRoutes } from '../Global/Config/register.c';
import { env } from '../Global/Environment/env';
import cors from 'cors'
import bodyParser from 'body-parser';
import morgan from 'morgan'
import { Controllers } from '../Global/Config/base';
 
    export class App {
        public app: Express;

        constructor() {
            this.app = express();
            this.config();
            this.routes();
        }
        
        private config() {
        
            this.app.use(cors())
            this.app.use(morgan('dev'))
            this.app.use(bodyParser.json({ limit: '50mb' }));
            this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        } 
       
        private routes() {
            
            const controllersApi = [
                Controllers.UsersControllers,
                Controllers.FormatsControllers,
                Controllers.TurnoControllers,
                Controllers.AreaControllers,
                Controllers.ReportsControllers
            ];
            RegisterRoutes(this.app, controllersApi);
        }

      
        public start(): Promise<void> {
            return new Promise((resolve) => {
                this.app.listen(env.PORT, () => {
                    console.log(`Servidor iniciado en http://localhost:${env.PORT}`); 
                    resolve();
                });
            });
        }
}