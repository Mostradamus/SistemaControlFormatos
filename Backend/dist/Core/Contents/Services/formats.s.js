"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatsServices = void 0;
const Query_1 = require("../../../Global/Config/Query");
const formats_1 = require("../../Entities/formats");
const formatsDetails_1 = require("../../Entities/formatsDetails");
const env_1 = require("../../../Global/Environment/env");
const ValidationParams_1 = require("../../Helpers/ValidationParams");
const StoreProcedure_1 = require("../../../Global/Config/StoreProcedure");
class FormatsServices {
    constructor() {
        this.format = new Query_1.QueryGlobal(formats_1.formats);
        this.formatDetails = new Query_1.QueryGlobal(formatsDetails_1.formatsDetails);
        this.sp = new StoreProcedure_1.StoreProcedure();
    }
    /**
     * Obtiene todos los formatos registrados
     * @param res - Objeto Response para la respuesta HTTP
     */
    getAllFormats(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const all = yield this.format.getAll();
                return res.status(200).json(all);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ msj: "Error al obtener la lista de formastos" });
            }
        });
    }
    /**
     * Busca un formato por su ID
     * @param req - Request con el ID del formato
     * @param res - Response para la respuesta HTTP
     * Incluye validación de parámetros
     */
    findFormatsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_formats } = req.params;
            if ((0, ValidationParams_1.ValidarFuncionParams)(req, res, "id_formasts")) {
                return;
            }
            try {
                const allById = yield this.format.getByField("id_formats", id_formats);
                if (Array.isArray(allById) || allById == null) {
                    return res.status(500).json({ msj: "El formato no exite" });
                }
                return res.status(200).json(allById);
            }
            catch (error) {
                return res.status(500).json({ msj: "Error al obtener la lista por id" });
            }
        });
    }
    getTotalByArea(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.sp.executeStoredProcedureForList("getTotalByArea", 0);
                console.log(result);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(500).json({ msj: "Error en el servidor" });
            }
        });
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
    insertFormats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_area, starting_order, total, id_turn, description } = req.body;
            if ((0, ValidationParams_1.ValidarFuncionReq)({ id_area, starting_order, total, id_turn, description }, res)) {
                return;
            }
            try {
                const datosF = yield this.format.getByField("starting_order", starting_order);
                if ((datosF && typeof datosF === "object" && Object.keys(datosF).length > 0) || datosF != null) {
                    return res.status(500).json({ msj: "El formato ya ha sido registrado" });
                }
                const validOrd = yield this.formatDetails.getByField("formats_models", starting_order);
                if (validOrd !== null && typeof validOrd === "object") {
                    return res.status(500).json({ msj: "El formato ya existe en los detalles" });
                }
                else {
                    const estado = yield this.sp.executeStoredProcedureForGet("sp_verificar_registro", [id_area, new Date, id_turn]);
                    if ((estado === null || estado === void 0 ? void 0 : estado.estado) == 1) {
                        return res.status(500).json({ msj: 'No se permite registra los datos por repeticion de algunos datos' });
                    }
                    const oFormats = new formats_1.formats();
                    oFormats.id_status = 1;
                    oFormats.id_area = id_area;
                    oFormats.registration_date = new Date();
                    oFormats.starting_order = starting_order;
                    oFormats.total = total;
                    oFormats.id_turn = id_turn;
                    oFormats.description = description;
                    const registF = yield this.format.create(oFormats);
                    let pInit = 8;
                    let pInitSOrder = Number(starting_order);
                    for (let index = pInitSOrder; index < Number(total) + pInitSOrder; index++) {
                        let currentLength = index.toString().length;
                        let vlInit = pInit - currentLength;
                        let conString = "";
                        for (let i = 0; i < vlInit; i++) {
                            conString = "0" + conString;
                        }
                        let newString = conString + index;
                        const fecha = new Date();
                        const anioDigitos = fecha.getFullYear().toString().slice(-2);
                        const OformatsD = new formatsDetails_1.formatsDetails();
                        OformatsD.id_formats = registF.id_formats;
                        OformatsD.anio = anioDigitos;
                        OformatsD.nro_serie = env_1.env.SERIE;
                        OformatsD.id_status = 1;
                        OformatsD.formats_models = newString;
                        yield this.formatDetails.create(OformatsD);
                    }
                    return res.status(200).json({ msj: "Formato Registrado exitosamente" });
                }
            }
            catch (error) {
                return res.status(500).json({ msj: "Error al obtener la lista por id" });
            }
        });
    }
    comprobarFormatos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { formatsModel, nrMin, nrMax } = req.body; // Extraemos la lista de formats_model desde el cuerpo de la solicitud
            try {
                console.log(typeof formatsModel);
                // if (!formatsModel || !Array.isArray(formatsModel)) {
                //   return res.status(400).json({ error: 'La lista de formats_model es requerida y debe ser un array.' });
                // }
                const listaFormatsModel = formatsModel;
                const query = `CALL verificar_formats_modelos_rango2(?,?,?);`; // Usamos '?' como marcador de posición
                console.log(listaFormatsModel);
                // Llamada a executeQuery con la cadena formateada como único parámetro
                const resultado = yield this.sp.executeQuery(query, 1, [listaFormatsModel, nrMin, nrMax]);
                let contador = resultado.length;
                // const query = `CALL verificar_formats_modelos(${listaFormatsModel});`;
                // const resultado = this.sp.executeQuery(query,1);
                // const resultado = await this.sp.executeStoredProcedureForList<verificar_formats_model>(
                //   'verificar_formats_model', // Nombre del procedimiento almacenado
                //   0,                          // Tipo de resultado esperado (1 indica que tomamos el primer resultado)
                //   formatsModel        // Lista de formats_model convertida a cadena
                // );
                return res.status(200).json({ lista: resultado, count: contador });
            }
            catch (error) {
                return res.status(500).json({ msj: "Error al obtener la lista por id" });
            }
        });
    }
    getAllFormatSp(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.sp.executeStoredProcedureForList("sp_mostrar_formats", 0);
                console.log(result);
                return res.status(200).json(result);
            }
            catch (error) {
                return res.status(500).json({ msj: "Error en el servidor" });
            }
        });
    }
    /**
     * Eliminación lógica de un formato (cambio de status a 2)
     * @param req - Request con el ID del formato
     * @param res - Response para la respuesta HTTP
     * Validaciones:
     * - ID existente
     * - Formato activo
     */
    deleteFormatsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_formats } = req.params;
            if ((0, ValidationParams_1.ValidarFuncionParams)(req, res, "id_formats")) {
                return;
            }
            try {
                const oFormasts = yield this.format.getByField("id_formats", id_formats);
                if (oFormasts == null || Array.isArray(oFormasts)) {
                    return res.status(404).json({
                        msj: "No se encontró el formato",
                    });
                }
                oFormasts.id_status = 2;
                yield this.format.update(oFormasts);
                return res.status(200).json({
                    msj: "formato eliminado correctamente",
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ msj: "Error en el servidor" });
            }
        });
    }
    updateFormatsDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_formats_details } = req.params;
            if ((0, ValidationParams_1.ValidarFuncionParams)(req, res, "id_formats_details")) {
                return;
            }
            try {
                const updateFD = yield this.formatDetails.getByField("id_formats_details", id_formats_details);
                if (updateFD == null || Array.isArray(updateFD)) {
                    return res.status(404).json({
                        msj: "No se encontró el formato",
                    });
                }
                updateFD.id_status = 2;
                yield this.formatDetails.update(updateFD);
            }
            catch (error) {
                return res.status(500).json({ msj: "Error en el servidor" });
            }
        });
    }
}
exports.FormatsServices = FormatsServices;
