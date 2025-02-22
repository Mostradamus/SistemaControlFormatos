import { Request, Response } from "express";
import {Get} from "../../Global/Decorators/routes.dc"
import { ITurnoService } from "../Contents/InterfaceServices/turno.i";
import { TurnoServices } from "../Contents/Services/turno.s";
import { ReportsServices } from "../Contents/Services/reports.s";
import { IfReportsService } from "../Contents/InterfaceServices/reports.i";

export class ReportsControllers{
    public reportService:IfReportsService;
    constructor (){
        this.reportService= new ReportsServices();
    }

    @Get("/reportes")
    async getAllAreas(req:Request, res:Response){
        return this.reportService.getReports(res);
    }
}