import { Request, Response } from "express";
import {Get,Post,Put,Delete} from "../../Global/Decorators/routes.dc"
import { IformatsService } from "../Contents/InterfaceServices/formats.i";
import { FormatsServices } from "../Contents/Services/formats.s";
import { IAreaService } from "../Contents/InterfaceServices/area.i";
import { AreaServices } from "../Contents/Services/area.s";
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