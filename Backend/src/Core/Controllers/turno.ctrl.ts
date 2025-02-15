import { Request, Response } from "express";
import {Get} from "../../Global/Decorators/routes.dc"
import { ITurnoService } from "../Contents/InterfaceServices/turno.i";
import { TurnoServices } from "../Contents/Services/turno.s";

export class TurnoControllers{
    public turnoService:ITurnoService;
    constructor (){
        this.turnoService= new TurnoServices();
    }

    @Get("/turnos")
    async getAllAreas(req:Request, res:Response){
        return this.turnoService.getAllTurno(res);
    }
}