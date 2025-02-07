import { Request, Response } from "express";
import {Get,Post,Delete, Put} from "../../Global/Decorators/routes.dc"
import { IformatsService } from "../Contents/InterfaceServices/formats.i";
import { FormatsServices } from "../Contents/Services/formats.s";

export class FormatsControllers{
    public FormatsServices:IformatsService;
    constructor (){
        this.FormatsServices= new FormatsServices();
    }

    @Get("/formatos")
    async getF(_req:Request, res:Response){
        return this.FormatsServices.getAllFormats(res);
    }
    @Get("/formatos/Lista")
    async getListaF(_req:Request, res:Response){
        return this.FormatsServices.getAllFormatSp(res);
    }
    @Get("/formatos/total/Area")
        async getTotal(_req:Request, res:Response){
            return this.FormatsServices.getTotalByArea(res);
    }

    @Post("/formatos/crear")
    async insertF(req:Request, res:Response){
        return this.FormatsServices.insertFormats(req, res);
    }
    @Post("/formatos/comprobar/formatos")
    async comprobar(req:Request, res:Response){
        console.log(11)
        return this.FormatsServices.comprobarFormatos(req, res);
    }

    @Delete("/formatos/eliminar")
    async deleteF(req:Request, res:Response){ 
        return this.FormatsServices.deleteFormatsById(req, res);
    }
    @Put('/formatos/actualizarEstado/:id_formats_details')
    async ActualizarRevision(req:Request, res:Response){
        return this.FormatsServices.updateFormatsDetails(req, res);
    }
}