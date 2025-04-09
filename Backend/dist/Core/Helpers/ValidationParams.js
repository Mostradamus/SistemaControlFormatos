"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidarFuncionReq = ValidarFuncionReq;
exports.ValidarFuncionParams = ValidarFuncionParams;
function ValidarFuncionReq(obj, res) {
    const camposFaltantes = Object.keys(obj).filter((key) => !obj[key]);
    if (camposFaltantes.length > 0) {
        return res.status(400).json({
            msj: `Faltan los siguientes datos en la solicitud: ${camposFaltantes.join(", ")}`,
        });
    }
}
function ValidarFuncionParams(req, res, ...campos) {
    const paramsFaltantes = campos.filter((campo) => !req.params[campo]);
    if (paramsFaltantes.length > 0) {
        res.status(400).json({
            msj: `Faltan los siguientes parámetros en la solicitud: ${paramsFaltantes.join(", ")}`,
        });
        return true;
    }
    return false;
}
