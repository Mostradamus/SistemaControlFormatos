import { Response, Request } from "express";
import { QueryGlobal } from "../../../Global/Config/Query";
import { formats } from "../../Entities/formats";
import { formatsDetails } from "../../Entities/formatsDetails";
import { IformatsService } from "../InterfaceServices/formats.i";
import {env} from '../../../Global/Environment/env'

import {
  ValidarFuncionParams,
  ValidarFuncionReq,
} from "../../Helpers/ValidationParams";
import { StoreProcedure } from "../../../Global/Config/StoreProcedure";
import { getTotalByArea, sp_mostrar_formats, sp_verificar_registro, verificar_formats_model ,sp_ObtenerTotalFormatos} from "../../Entities/Procedures/sp_mostrar_formats";
import { ComparisonResult } from "../../Entities/comparisonResult";
import { ResultBody } from "../../Entities/exporttar";
import { ComparisonResultDetails } from "../../Entities/comparisonResultDetails";

export class FormatsServices implements IformatsService {
  public format;
  public formatDetails;
  public comparisonResult;
  public comparisonResultDetail;
  private sp;

  constructor() {
    this.format = new QueryGlobal(formats);
    this.formatDetails = new QueryGlobal(formatsDetails);
    this.sp = new StoreProcedure();
    this.comparisonResult = new QueryGlobal(ComparisonResult)
    this.comparisonResultDetail = new QueryGlobal(ComparisonResultDetails)
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

  async getTotalByArea( res: Response){
    try {
      const result =
        await this.sp.executeStoredProcedureForList<getTotalByArea>(
          "getTotalByArea",0
        );
        console.log(result)
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ msj: "Error en el servidor" });
    }
  }


  async insertFormats(req: Request, res: Response) {
    const { id_area, starting_order, total, id_turn, description }: formats = req.body;
    if (ValidarFuncionReq({ id_area, starting_order, total, id_turn, description }, res)) {
      return;
    }
    try {
      const datosF = await this.format.getByField("starting_order",starting_order);

      if (
        (datosF && typeof datosF === "object" && Object.keys(datosF).length > 0) || datosF != null) {
        return res.status(500).json({ msj: "El formato ya ha sido registrado" });
      }
      const validOrd = await this.formatDetails.getByField("formats_models",starting_order
      ); 

      if (validOrd !== null && typeof validOrd === "object") {
        return res.status(500).json({ msj: "El formato ya existe en los detalles" });
      } else {
        const estado = await this.sp.executeStoredProcedureForGet<sp_verificar_registro>("sp_verificar_registro", [id_area, new Date, id_turn]);
        if (estado?.estado == 1) {
          return res.status(500).json({msj: 'No se permite registra los datos por repeticion de algunos datos'})
        }
       
        const oFormats = new formats();
        oFormats.id_status = 1;
        oFormats.id_area = id_area;
        oFormats.registration_date = new Date();
        oFormats.starting_order = starting_order;
        oFormats.total = total;
        oFormats.id_turn = id_turn;
        oFormats.description = description;

        const registF = await this.format.create(oFormats);

        let pInit = 8;
        let pInitSOrder = Number(starting_order);
        for (  let index = pInitSOrder;index < Number(total) + pInitSOrder;index++) {
          let currentLength = index.toString().length;
          let vlInit = pInit - currentLength;
          let conString = "";
          for (let i = 0; i < vlInit; i++) {
            conString = "0" + conString;
          }
          let newString = conString + index;
          const fecha = new Date();
          const anioDigitos = fecha.getFullYear().toString().slice(-2);
          const OformatsD = new formatsDetails();
          OformatsD.id_formats = registF.id_formats;
          OformatsD.anio = anioDigitos;
          OformatsD.nro_serie= env.SERIE;
          OformatsD.orden = index
          OformatsD.id_status = 1;
          OformatsD.formats_models = newString;
          await this.formatDetails.create(OformatsD);
        }
        return res.status(200).json({ msj: "Formato Registrado exitosamente" });
      }
    } catch (error) {
      return res.status(500).json({ msj: "Error al obtener la lista por id" });
    }
  }
  async comprobarFormatos(req: Request, res:Response){
    const { formatsModel, nrMin, nrMax, status } = req.body; // Extraemos la lista de formats_model desde el cuerpo de la solicitud
    try {
      
      const listaFormatsModel = formatsModel; 
      const query = status == 1 ?`CALL verificar_formats_modelos_rango2(?,?,?);`: 'CALL verificar_formats_pendiente_modelos_rango2(?,?)'; 
      // Llamada a executeQuery con la cadena formateada como único parámetro
     console.log(nrMin)
     console.log(nrMax)
     console.log(listaFormatsModel)
      const params = status == 1 
        ? [listaFormatsModel, nrMin, nrMax] 
        : [];
      
        const queryMessage= "CALL sp_message_comparison(?, ?, ?)"
        const rsMnsaje = await this.sp.executeQuery(queryMessage, 1, params)
      const resultado = await this.sp.executeQuery(query, 1, params);
      // console.log(resultado)
      let contador = resultado.length;  
      return res.status(200).json({ lista:resultado, count: contador, mensaje: rsMnsaje})
      
    } catch (error) {
      return res.status(500).json({ msj: "Error al obtener la lista por id" });
    }

  }
  async obtenerTotalFormatosDetalles(res:Response){
    try {
      const estado = await this.sp.executeStoredProcedureForGet<sp_ObtenerTotalFormatos>("sp_ObtenerTotalFormatos");
      return res.status(200).json(estado);
    } catch (error) {
      return res.status(500).json({ msj: "Error en el servidor" });
    }
  }
  async getAllFormatSp(res: Response) {
    try {
      const result =
        await this.sp.executeStoredProcedureForList<sp_mostrar_formats>(
          "sp_mostrar_formats",0
        );
        console.log(result)
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ msj: "Error en el servidor" });
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
      oFormasts.id_status = 2;

      await this.format.update(oFormasts);
      return res.status(200).json({
        msj: "formato eliminado correctamente",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msj: "Error en el servidor" });
    }
  }
  async updateFormatsDetails(req: Request, res: Response){
    const {id_formats_details}: formatsDetails = req.params;
    if (ValidarFuncionParams(req, res, "id_formats_details")) {
      return;
    }

    try {
      const updateFD = await this.formatDetails.getByField("id_formats_details",id_formats_details);
      if (updateFD == null || Array.isArray(updateFD)) {
        return res.status(404).json({
          msj: "No se encontró el formato",
        });
      }
      updateFD.id_status = 2;

      await this.formatDetails.update(updateFD);
    } catch (error) {
      return res.status(500).json({ msj: "Error en el servidor" });
    }

  }
  async insertComparisonResult(req: Request, res: Response){
    const { cabecera, detalles, detallesLista, status}: ResultBody = req.body;
    try {
      if (!cabecera || !Array.isArray(detalles) || detalles.length === 0) {
        return res.status(400).json({ mensaje: 'Estructura de datos inválida' });
      }
      const _cmparison = new ComparisonResult();
      _cmparison.name_area_comparison = cabecera.name_area_comparison;
      _cmparison.total_quantity = cabecera.total_quantity;
      _cmparison.registration_date_comparison= new Date();
      const idComparacion = await this.comparisonResult.create(_cmparison);
      var l = detallesLista.join(',')
      console.log(detallesLista.join(',') )
      await this.sp.executeQuery("CALL sp_updateStatusDetailsFormat(?,?)", 2, [l, status]);
      const detallesStr = detalles
        .map(item => `${item.area_comparison}|${item.model_format}`)
        .join(',');
        console.log(detallesStr)
        var id = idComparacion.id_comparison
        await  this.sp.executeQuery('CALL InsertComparisonDetails(?, ?)',2,[id, detallesStr]
        )  
      return res.status(200).json({ msj: "Formato Registrado exitosamente" });
    } catch (error) {
      console.log(error)
      return res.status(500).json({ msj: "Error al obtener la lista por id" });
    }
  }
}
