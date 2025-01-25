import { Response, Request } from "express";
import { QueryGlobal } from "../../../Global/Config/Query";
import {  IAreaService} from "../InterfaceServices/area.i";
import { areas } from "../../Entities/areas";

export class AreaServices implements IAreaService{
  public area; 
  constructor() {
    this.area = new QueryGlobal(areas);
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
}