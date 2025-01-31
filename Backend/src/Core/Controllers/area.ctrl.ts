import { Request, Response } from "express";
import {Get,Post,Put,Delete} from "../../Global/Decorators/routes.dc"
import { IformatsService } from "../Contents/InterfaceServices/formats.i";
import { FormatsServices } from "../Contents/Services/formats.s";
import { IAreaService } from "../Contents/InterfaceServices/area.i";
import { AreaServices } from "../Contents/Services/area.s";

export class AreaControllers{
    public areaServices:IAreaService;
    constructor (){
        this.areaServices= new AreaServices();
    }

    @Get("/areas")
    async getAllAreas(req:Request, res:Response){
        return this.areaServices.getAllArea(res);
    }

    @Get("/areas/revision")
    async getAreasRevision(req:Request, res:Response){
        return this.areaServices.getAreasRevision(res);
    }
    @Get("/areas/detalles/:id_area/estado/:status")
    async getAreasRevisionDetalle(req:Request, res:Response){
        return this.areaServices.getAreasRevisionDetalle(req,res);
    }
}