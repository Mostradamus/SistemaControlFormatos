"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidarFuncionReq = ValidarFuncionReq;
exports.ValidarFuncionParams = ValidarFuncionParams;
/**
 * Valida que todos los campos requeridos estén presentes en el cuerpo de la solicitud
 * @param obj - Objeto con los campos a validar
 * @param res - Objeto Response para enviar mensaje de error
 * @returns Response con error 400 si faltan campos, undefined si todo está correcto
 */
function ValidarFuncionReq(obj, res) {
    // Filtra los campos que tienen valor falsy (null, undefined, vacío)
    const camposFaltantes = Object.keys(obj).filter((key) => !obj[key]);
    // Si hay campos faltantes, retorna error 400 con la lista
    if (camposFaltantes.length > 0) {
        return res.status(400).json({
            msj: `Faltan los siguientes datos en la solicitud: ${camposFaltantes.join(", ")}`,
        });
    }
}
/**
 * Valida que todos los parámetros requeridos estén presentes en la URL
 * @param req - Objeto Request que contiene los parámetros
 * @param res - Objeto Response para enviar mensaje de error
 * @param campos - Lista de nombres de parámetros a validar
 * @returns true si faltan parámetros, false si todos están presentes
 */
function ValidarFuncionParams(req, res, ...campos) {
    // Filtra los parámetros que no están presentes en la request
    const paramsFaltantes = campos.filter((campo) => !req.params[campo]);
    // Si hay parámetros faltantes, envía error 400 con la lista
    if (paramsFaltantes.length > 0) {
        res.status(400).json({
            msj: `Faltan los siguientes parámetros en la solicitud: ${paramsFaltantes.join(", ")}`,
        });
        return true;
    }
    return false;
}
