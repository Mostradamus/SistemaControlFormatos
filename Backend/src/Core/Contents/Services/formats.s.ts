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
    this.formatDetails = new QueryGlobal(formatsDetails);
  }

  /**
   * Obtiene todos los formatos registrados
   * @param res - Objeto Response para la respuesta HTTP
   */
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

  /**
   * Busca un formato por su ID
   * @param req - Request con el ID del formato
   * @param res - Response para la respuesta HTTP
   * Incluye validación de parámetros
   */
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

  /**
   * Inserta un nuevo formato y genera sus detalles
   * @param req - Request con datos del formato (starting_order, total, turn, description)
   * @param res - Response para la respuesta HTTP
   * Validaciones:
   * - Campos requeridos completos
   * - No duplicidad de starting_order
   * - No existencia en formatos_details
   * Proceso:
   * 1. Valida duplicidad
   * 2. Crea el formato principal
   * 3. Genera detalles con formato numérico padded con ceros
   */
  async insertFormats(req: Request, res: Response) {
    const { starting_order, total, turn, description }: formats = req.body;

    if (ValidarFuncionReq({ starting_order, total, turn, description }, res)) {
      return;
    }
    try {
      const datosF = await this.format.getByField(
        "starting_order",
        starting_order
      );
      if (
        (datosF &&
          typeof datosF === "object" &&
          Object.keys(datosF).length > 0) ||
        datosF != null
      ) {
        return res
          .status(500)
          .json({ msj: "El formato ya ha sido registrado" });
      }
      const validOrd = await this.formatDetails.getByField(
        "formats_models",
        starting_order
      );

      if (validOrd !== null && typeof validOrd === "object") {
        return res
          .status(500)
          .json({ msj: "El formato ya existe en los detalles" });
      } else {
        const oFormats = new formats();
        oFormats.status = 1;
        oFormats.registration_date = new Date();
        oFormats.starting_order = starting_order;
        oFormats.total = total;
        oFormats.turn = turn;
        oFormats.description = description;

        const registF = await this.format.create(oFormats);

        let pInit = 7;
        let pInitSOrder = Number(starting_order);
        let totalCero = Number(total) + pInitSOrder;
        for (
          let index = pInitSOrder;
          index < Number(total) + pInitSOrder;
          index++
        ) {
          let currentLength = index.toString().length;
          let vlInit = pInit - currentLength;
          let conString = "";
          for (let i = 0; i < vlInit; i++) {
            conString = "0" + conString;
          }
          let newString = conString + index;

          const OformatsD = new formatsDetails();
          OformatsD.id_formats = registF.id_formats;
          OformatsD.status = 1;
          OformatsD.formats_models = newString;
          await this.formatDetails.create(OformatsD);
        }
        return res.status(200).json({ msj: "Formato Registrado exitosamente" });
      }
    } catch (error) {
      return res.status(500).json({ msj: "Error al obtener la lista por id" });
    }
  }

  /**
   * Eliminación lógica de un formato (cambio de status a 2)
   * @param req - Request con el ID del formato
   * @param res - Response para la respuesta HTTP
   * Validaciones:
   * - ID existente
   * - Formato activo
   */
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
