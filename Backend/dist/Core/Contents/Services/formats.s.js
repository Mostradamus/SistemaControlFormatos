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
const comparisonResult_1 = require("../../Entities/comparisonResult");
const comparisonResultDetails_1 = require("../../Entities/comparisonResultDetails");
class FormatsServices {
    constructor() {
        this.format = new Query_1.QueryGlobal(formats_1.formats);
        this.formatDetails = new Query_1.QueryGlobal(formatsDetails_1.formatsDetails);
        this.sp = new StoreProcedure_1.StoreProcedure();
        this.comparisonResult = new Query_1.QueryGlobal(comparisonResult_1.ComparisonResult);
        this.comparisonResultDetail = new Query_1.QueryGlobal(comparisonResultDetails_1.ComparisonResultDetails);
    }
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
                        OformatsD.orden = index;
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
            const { formatsModel, nrMin, nrMax, status } = req.body; // Extraemos la lista de formats_model desde el cuerpo de la solicitud
            try {
                const listaFormatsModel = formatsModel;
                const query = status == 1 ? `CALL verificar_formats_modelos_rango2(?,?,?);` : 'CALL verificar_formats_pendiente_modelos_rango2(?,?)';
                // Llamada a executeQuery con la cadena formateada como único parámetro
                console.log(nrMin);
                console.log(nrMax);
                console.log(listaFormatsModel);
                const params = status == 1
                    ? [listaFormatsModel, nrMin, nrMax]
                    : [];
                const queryMessage = "CALL sp_message_comparison(?, ?, ?)";
                const rsMnsaje = yield this.sp.executeQuery(queryMessage, 1, params);
                const resultado = yield this.sp.executeQuery(query, 1, params);
                // console.log(resultado)
                let contador = resultado.length;
                return res.status(200).json({ lista: resultado, count: contador, mensaje: rsMnsaje });
            }
            catch (error) {
                return res.status(500).json({ msj: "Error al obtener la lista por id" });
            }
        });
    }
    obtenerTotalFormatosDetalles(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estado = yield this.sp.executeStoredProcedureForGet("sp_ObtenerTotalFormatos");
                return res.status(200).json(estado);
            }
            catch (error) {
                return res.status(500).json({ msj: "Error en el servidor" });
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
    insertComparisonResult(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cabecera, detalles, detallesLista, status } = req.body;
            try {
                if (!cabecera || !Array.isArray(detalles) || detalles.length === 0) {
                    return res.status(400).json({ mensaje: 'Estructura de datos inválida' });
                }
                const _cmparison = new comparisonResult_1.ComparisonResult();
                _cmparison.name_area_comparison = cabecera.name_area_comparison;
                _cmparison.total_quantity = cabecera.total_quantity;
                _cmparison.registration_date_comparison = new Date();
                const idComparacion = yield this.comparisonResult.create(_cmparison);
                var l = detallesLista.join(',');
                console.log(detallesLista.join(','));
                yield this.sp.executeQuery("CALL sp_updateStatusDetailsFormat(?,?)", 2, [l, status]);
                const detallesStr = detalles
                    .map(item => `${item.area_comparison}|${item.model_format}`)
                    .join(',');
                console.log(detallesStr);
                var id = idComparacion.id_comparison;
                yield this.sp.executeQuery('CALL InsertComparisonDetails(?, ?)', 2, [id, detallesStr]);
                // for (const element of detalles) {
                //   //obtener el valor para acctualizar
                //   let nroFormat = element.model_format;
                //   let nro = nroFormat?.split('-')[1]
                //   // Llamada a executeQuery con la cadena formateada como único parámetro
                //   const dtComparisonDetails = new ComparisonResultDetails();
                //   dtComparisonDetails.area_comparison = element.area_comparison;
                //   dtComparisonDetails.id_comparison = idComparacion.id_comparison;
                //   dtComparisonDetails.model_format = element.model_format;
                //   dtComparisonDetails.registration_date_comparison_details = new Date();
                //   await this.comparisonResultDetail.create(dtComparisonDetails);
                // }
                return res.status(200).json({ msj: "Formato Registrado exitosamente" });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ msj: "Error al obtener la lista por id" });
            }
        });
    }
}
exports.FormatsServices = FormatsServices;
