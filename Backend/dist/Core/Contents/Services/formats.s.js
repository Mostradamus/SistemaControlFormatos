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
const ValidationParams_1 = require("../../Helpers/ValidationParams");
class FormatsServices {
    constructor() {
        this.format = new Query_1.QueryGlobal(formats_1.formats);
        this.formatDetails = new Query_1.QueryGlobal(formatsDetails_1.formatsDetails);
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
            console.log(req.body);
            const { status, starting_order, total, turn, description } = req.body;
            if ((0, ValidationParams_1.ValidarFuncionReq)({ status, starting_order, total, turn, description }, res)) {
                return;
            }
            try {
                const datosF = yield this.format.getByField("starting_order", starting_order);
                if (Array.isArray(datosF)) {
                    return res.status(500).json({ msj: "El formato ya existe" });
                }
                let pInit = 7;
                let pInitSOrder = Number(starting_order);
                let result = "";
                console.log(pInitSOrder, "orden");
                console.log(total, "orden");
                for (let index = pInitSOrder; index < Number(total); index++) {
                    let vlInit = pInit - index;
                    console.log(vlInit);
                    let conString = "";
                    for (let i = 0; i < vlInit; i++) {
                        conString = "0";
                    }
                    result = `${index}`;
                    let newString = conString + index;
                    console.log(newString);
                    const datosFD = yield this.formatDetails.getByField("formats_models", newString);
                    if (datosFD) {
                        // Si se encuentra un valor válido, rompe el ciclo
                        console.log("Valor encontrado:", index);
                        result = "se encontro " + index;
                    }
                    else {
                        // Si `datosFD` es null, continúa con la siguiente iteración
                        console.log("Valor no encontrado, continuando...");
                        result = "se encontro " + index;
                    }
                }
                console.log(result);
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
            }
            catch (error) {
                return res.status(500).json({ msj: "Error al obtener la lista por id" });
            }
        });
    }
    updateFormats(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, starting_order, total, turn, description } = req.body;
            const { id_formats } = req.params;
            if ((0, ValidationParams_1.ValidarFuncionReq)({ status, starting_order, total, turn, description }, res)) {
                return;
            }
            try {
                const datosF = yield this.format.getByField("id_formats", id_formats);
                if (Array.isArray(datosF) || datosF == null) {
                    return res.status(500).json({ msj: "El formato ya existe" });
                }
                //Validacion sobre el estado del order inicial
                if (datosF.starting_order == starting_order) {
                    let changeN = Number(starting_order);
                    let changeN2 = Number(datosF.starting_order);
                    const total = (Number(datosF.total) + changeN2) || 0;
                    for (let index = changeN2; index < total; index++) {
                        if (changeN == index) {
                            return res.status(500).json({ msj: "El valor del formato ya se encuentra registrado" });
                        }
                    }
                }
                datosF.status = status;
                datosF.starting_order = starting_order;
                datosF.total = total;
                datosF.turn = turn;
                datosF.description = description;
                yield this.format.create(datosF);
                return res.status(200).json({ msj: "Formato actualiando exitosamente" });
            }
            catch (error) {
                return res.status(500).json({ msj: "Error al actulizar" });
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
exports.FormatsServices = FormatsServices;
