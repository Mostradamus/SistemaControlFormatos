import { Response, Request } from "express";
import { QueryGlobal } from "../../../Global/Config/Query";
import {  IAreaService} from "../InterfaceServices/area.i";
import { areas } from "../../Entities/areas";
import { StoreProcedure } from "../../../Global/Config/StoreProcedure";
import { GetFormatDetailsByAreaAndDate, GetGroupedFormatsByDate } from "../../Entities/Procedures/sp_mostrar_formats";
import { formats } from "../../Entities/formats";

export class AreaServices implements IAreaService{
  public area; 
  public sp;
  constructor() {
    this.area = new QueryGlobal(areas);
    this.sp = new StoreProcedure();
  }
  async getAllArea(res: Response) {
    try {
      const all = await this.area.getAll();
      return res.status(200).json(all);
    } catch (error) {
      return res
        .status(500)
        .json({ msj: "Error al obtener la lista de formastos" });
    }
  }
  async getAreasRevision(res: Response){
    try {
      const all = await this.sp.executeStoredProcedureForList<GetGroupedFormatsByDate>("GetGroupedFormatsByDate", 0);
      return res.status(200).json(all);
    } catch (error) {
      return res
        .status(500)
        .json({ msj: "Error al obtener la lista de formastos" });
    }
  }

  async getAreasRevisionDetalle(req: Request, res: Response){
    const {id_area, id_status}: formats = req.params;
    const { fechaInicio, fechaFin } = req.query;
    try {
      
      console.log(id_area)
      const all = await this.sp.executeStoredProcedureForList<GetFormatDetailsByAreaAndDate>("GetFormatDetailsByAreaAndDate",1, [id_area, id_status ,fechaInicio, fechaFin]);
      console.log(all)
      return res.status(200).json(all);
    } catch (error) {
      return res
        .status(500)
        .json({ msj: "Error al obtener la lista de formastos" });
    }
  }
}