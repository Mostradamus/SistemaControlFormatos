import express, { Express, Request, Response } from 'express';
import 'reflect-metadata'; 
import { RegisterRoutes } from '../Global/Config/register.c';
import { env } from '../Global/Environment/env';
import cors from 'cors'
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
            

            this.app.use(express.json());
            this.app.use(cors({
                origin: 'http://localhost:4200'
            }))
            this.app.use(morgan('dev'))
        } 
       
        private routes() {
            
            const controllersApi = [
                Controllers.UsersControllers,
                Controllers.FormatsControllers,
                Controllers.TurnoControllers,
                Controllers.AreaControllers
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