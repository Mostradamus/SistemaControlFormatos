import { Response, Request } from "express";
import { QueryGlobal } from "../../../Global/Config/Query";
import { formats } from "../../Entities/formats";
import { formatsDetails } from "../../Entities/formatsDetails";
import { IformatsService } from "../InterfaceServices/formats.i";
import {
  ValidarFuncionParams,
  ValidarFuncionReq,
} from "../../Helpers/ValidationParams";

export class FormatsServices implements IformatsService {
  public format;
  public formatDetails;
  constructor() {
    this.format = new QueryGlobal(formats);
    this.formatDetails = new QueryGlobal(formatsDetails)
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
      const {starting_order,total,turn,description}: formats = req.body;
      if (ValidarFuncionReq({ starting_order, total, turn, description}, res)) {
        return;
      }
      try {
        console.log("mucho antes de la tragedia")
        const datosF = await this.format.getByField("starting_order", starting_order);
      // Validar si datosF es un objeto no vacío
      console.log(datosF,3)
      if (datosF && typeof datosF === "object" && Object.keys(datosF).length > 0 || datosF!=null) {
        return res.status(500).json({ msj: "El formato ya ha sido registrado" });
      }
      console.log("antes de la tragedia")
      const validOrd = await this.formatDetails.getByField("formats_models",starting_order); 
    
        if (validOrd !== null && typeof validOrd === "object"){
          return res.status(500).json({ msj: "El formato ya existe en los detalles" });
        }
        else{
          const oFormats = new formats();
          oFormats.status = 1;
          oFormats.registration_date=new Date
          oFormats.starting_order = starting_order;
          oFormats.total = total;
          oFormats.turn = turn;
          oFormats.description = description;
          const registF = await this.format.create(oFormats);
          let pInit = 7;
          let pInitSOrder = Number(starting_order);
          let totalCero = Number(total)+pInitSOrder;
          for (let index = pInitSOrder; index < Number(total)+pInitSOrder; index++) {
            let currentLength = index.toString().length; // Longitud actual del número
            let vlInit = pInit - currentLength; // Número de ceros a agregar
            let conString = "";
            for(let i = 0; i < vlInit; i++){
              conString = "0"+ conString;
            }
            let newString = conString + index;
            const OformatsD = new formatsDetails();
            OformatsD.id_formats = registF.id_formats;
            OformatsD.status = 1;
            OformatsD.formats_models=newString;
            await this.formatDetails.create(OformatsD);
          }
          return res.status(200).json({ msj: "Formato Registrado exitosamente" });
        }
          
      } catch (error) {
        return res.status(500).json({ msj: "Error al obtener la lista por id" });
      }
  }

  async updateFormats(req: Request, res: Response){
    const {status,starting_order,total,turn,description}: formats = req.body;
    const {id_formats}: formats = req.params;
    if (ValidarFuncionReq({ status, starting_order, total, turn, description}, res)) {
      return;
    }
    try {
      const datosF = await this.format.getByField("id_formats", id_formats);
      if (Array.isArray(datosF) || datosF == null) {
        return res.status(500).json({ msj: "El formato ya existe" });
      }
      //Validacion sobre el estado del order inicial
      if (datosF.starting_order==starting_order) {
        let changeN= Number(starting_order);
        let changeN2= Number(datosF.starting_order)
        const total = (Number (datosF.total) + changeN2) || 0; 
        for (let index = changeN2; index < total; index++) {
          if (changeN==index) {
            return res.status(500).json({msj: "El valor del formato ya se encuentra registrado"});
          }
        }
      }
      
            datosF.status = status;
            datosF.starting_order = starting_order;
            datosF.total = total;
            datosF.turn = turn;
            datosF.description = description;
            await this.format.create(datosF);
            return res.status(200).json({ msj: "Formato actualiando exitosamente" });
    } catch (error) {
      return res.status(500).json({ msj: "Error al actulizar" });
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
