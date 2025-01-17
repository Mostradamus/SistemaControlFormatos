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
    console.log(req.body)
      const {status,starting_order,total,turn,description}: formats = req.body;
      if (ValidarFuncionReq({ status, starting_order, total, turn, description}, res)) {
        return;
      }
      try {
        const datosF = await this.format.getByField("starting_order", starting_order);
        if (Array.isArray(datosF)) {
          return res.status(500).json({ msj: "El formato ya existe" });
        }
        let pInit = 7;
        let pInitSOrder = Number(starting_order);
        let result = "";
        console.log(pInitSOrder, "orden")
        console.log(total, "orden")
        for (let index = pInitSOrder; index < Number(total); index++) {
          let vlInit = pInit - index;
          console.log(vlInit)
          let conString = "";
          for(let i = 0; i < vlInit; i++){
            conString = "0";
          }
          result = `${index}`
          let newString = conString + index;
          console.log(newString)
          const datosFD = await this.formatDetails.getByField("formats_models",newString );
          if (datosFD) {
            // Si se encuentra un valor válido, rompe el ciclo
            console.log("Valor encontrado:", index);
            result = "se encontro "+index;
            
          } else {
              // Si `datosFD` es null, continúa con la siguiente iteración
              console.log("Valor no encontrado, continuando...");
              result = "se encontro "+index;
          }

        }
        console.log(result)
        // if(datosF != null){
        //   //Validacion sobre el estado del order inicial
        //   if (datosF.starting_order==starting_order) {
        //     let changeN= Number(starting_order);
        //     let changeN2= Number(datosF.starting_order)
        //     const total = (Number (datosF.total) + changeN2) || 0; 
        //     for (let index = changeN2; index < total; index++) {
        //       if (changeN==index) {
        //         return res.status(500).json({msj: "El valor del formato ya se encuentra registrado"});
        //       }
        //     }
        //   }
        // }
          // const oFormats = new formats();
          //       oFormats.status = status;
          //       oFormats.starting_order = starting_order;
          //       oFormats.total = total;
          //       oFormats.turn = turn;
          //       oFormats.description = description;
          //       await this.format.create(oFormats);
          //       return res.status(200).json({ msj: "Formato Registrado exitosamente" });

        
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
