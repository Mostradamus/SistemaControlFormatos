import { Response, Request } from "express";
import { QueryGlobal } from "../../../Global/Config/Query";
import { formats } from "../../Entities/formats";
import { IformastsService } from "../InterfaceServices/formats.i";
import {
  ValidarFuncionParams,
  ValidarFuncionReq,
} from "../../Helpers/ValidationParams";

export class FormastsServices implements IformastsService {
  public format;
  constructor() {
    this.format = new QueryGlobal(formats);
  }
  async getAllFormats(res: Response) {
    try {
      const all = await this.format.getAll();
      return res.status(200).json(all);
    } catch (error) {
      return res
        .status(500)
        .json({ msj: "Error al obtener la lista de formastos" });
    }
  }
  async findFormatsById(req: Request, res: Response) {
    const { id_formats }: formats = req.params;
    if (ValidarFuncionParams(req, res, "id_formasts")) {
      return;
    }
    try {
      const allById = await this.format.getByField("id_formats", id_formats);
      if (Array.isArray(allById) || allById == null) {
        return res.status(500).json({ msj: "El formato no exite" });
      }
      return res.status(200).json(allById);
    } catch (error) {
      return res.status(500).json({ msj: "Error al obtener la lista por id" });
    }
  }
   async insertFormats(req: Request, res: Response){
      const {status,starting_order,total,turn,description}: formats = req.body;
      if (ValidarFuncionReq({ status, starting_order, total, turn, description}, res)) {
        return;
      }
      try {
        const datosF = await this.format.getByField("starting_order", starting_order);
        if (Array.isArray(datosF) || datosF == null) {
          return res.status(500).json({ msj: "El formato ya existe" });
        }
        //Validacion sobre el estado del order inicial
        if (datosF.starting_order==starting_order) {
          let changeN= Number(starting_order);
          const total = datosF.total || 0; 
          for (let index = 0; index < total; index++) {
            
          }
        }
      } catch (error) {
        
      }
  }


  async deleteFormatsById(req: Request, res: Response) {
    const { id_formats }: formats = req.params;
    if (ValidarFuncionParams(req, res, "id_formats")) {
      return;
    }
    try {
      const oFormasts = await this.format.getByField("id_formats", id_formats);
      if (oFormasts == null || Array.isArray(oFormasts)) {
        return res.status(404).json({
          msj: "No se encontró el formato",
        });
      }
      oFormasts.status = 2;

      await this.format.update(oFormasts);
      return res.status(200).json({
        msj: "formato eliminado correctamente",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msj: "Error en el servidor" });
    }
  }
}
