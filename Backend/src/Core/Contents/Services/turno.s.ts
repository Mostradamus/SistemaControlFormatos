import { Response, Request } from "express";
import { QueryGlobal } from "../../../Global/Config/Query";
import { IAreaService} from "../InterfaceServices/area.i";
import { turn } from "../../Entities/turn";
import { ITurnoService } from "../InterfaceServices/turno.i";

export class TurnoServices implements ITurnoService{
  public turno; 
  constructor() {
    this.turno = new QueryGlobal(turn);
  }
  async getAllTurno(res: Response) {
    try {
      const all = await this.turno.getAll();
      return res.status(200).json(all);
    } catch (error) {
      return res
        .status(500)
        .json({ msj: "Error al obtener la lista de formastos" });
    }
  }
}