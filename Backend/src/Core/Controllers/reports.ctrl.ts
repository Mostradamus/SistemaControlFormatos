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
    async getAllReport(req:Request, res:Response){
        return this.reportService.getReports(res);
    }
    @Get("/reportes/archivo/:id_comparison")
    async getAllReportID(req:Request, res:Response){
        return this.reportService.getReportID(req,res);
    }
    @Get("/reportes/totales/:id_status")
    async getTotalStatusAreaCount(req:Request, res:Response){
        console.log("entro")
        return this.reportService.getTotalStatusAreaCount(req,res);
    }
}