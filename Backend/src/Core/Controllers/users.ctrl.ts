import { Request, Response } from "express";
import {Get,Post,Put,Delete} from "../../Global/Decorators/routes.dc"
import {IusersService} from "../Contents/InterfaceServices/users.i"
import {UsersService} from "../Contents/Services/users.s"

export class UsersControllers{
    public UsersServices:IusersService;
    constructor (){
        this.UsersServices= new UsersService();
    }

    @Get("/usuarios")
    async getU(req:Request, res:Response){
        return this.UsersServices.getAllUsers(res);
    }
    @Get("/usuarios/:id_users")
    async getUserById(req:Request, res:Response){
        return this.UsersServices.findUsersById(req,res);
    }
    @Post("/usuarios/crear")
    async insertU(req:Request, res:Response){
        return this.UsersServices.insertUsers(req, res);
        
    }
    @Put("/usuarios/actualizar/:id_users")
    async updateU(req: Request, res: Response){
        return this.UsersServices.updateUsers(req, res);
    }
    @Delete("/usuarios/eliminar/:id_users")
    async deleteU(req:Request, res:Response){
        return this.UsersServices.deleteUsersById(req, res);
    }
    @Post("/usuarios/validar")
    async loginV(req:Request, res:Response){
        return this.UsersServices.loginValid(req, res);
        
    }
}