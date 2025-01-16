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
exports.FormastsServices = void 0;
const Query_1 = require("../../../Global/Config/Query");
const formats_1 = require("../../Entities/formats");
const ValidationParams_1 = require("../../Helpers/ValidationParams");
class FormastsServices {
    constructor() {
        this.format = new Query_1.QueryGlobal(formats_1.formats);
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
    insertFormats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, starting_order, total, turn, description } = req.body;
            if ((0, ValidationParams_1.ValidarFuncionReq)({ status, starting_order, total, turn, description }, res)) {
                return;
            }
            try {
                const datosF = yield this.format.getByField("starting_order", starting_order);
                if (Array.isArray(datosF) || datosF == null) {
                    return res.status(500).json({ msj: "El formato ya existe" });
                }
                //Validacion sobre el estado del order inicial
                if (datosF.starting_order == starting_order) {
                    let changeN = Number(starting_order);
                    const total = datosF.total || 0;
                    for (let index = 0; index < total; index++) {
                    }
                }
            }
            catch (error) {
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
                oFormasts.status = 2;
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
}
exports.FormastsServices = FormastsServices;
