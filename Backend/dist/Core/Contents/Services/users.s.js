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
exports.UsersService = void 0;
const Query_1 = require("../../../Global/Config/Query");
const users_1 = require("../../Entities/users");
const ValidationParams_1 = require("../../Helpers/ValidationParams");
class UsersService {
    constructor() {
        // Inicializa el query global para usuarios
        this.user = new Query_1.QueryGlobal(users_1.users);
    }
    /**
     * Obtiene todos los usuarios del sistema
     */
    getAllUsers(res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const all = yield this.user.getAll();
                return res.status(200).json(all);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ msj: "Error al obtener la lista de usuarios" });
            }
        });
    }
    /**
     * Busca un usuario por ID
     * Incluye validación de parámetros
     */
    findUsersById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_users } = req.params;
            if ((0, ValidationParams_1.ValidarFuncionParams)(req, res, "id_users")) {
                return;
            }
            try {
                const allById = yield this.user.getByField("id_users", id_users);
                if (Array.isArray(allById) || allById == null) {
                    return res.status(500).json({ msj: "El Usuario no exite" });
                }
                return res.status(200).json(allById);
            }
            catch (error) {
                return res.status(500).json({ msj: "Error al obtener la lista por id" });
            }
        });
    }
    /**
     * Crea un nuevo usuario
     * Incluye validaciones:
     * - Campos requeridos
     * - Usuario no existente
     */
    insertUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { status, username, userpassword } = req.body;
            if ((0, ValidationParams_1.ValidarFuncionReq)({ status, username, userpassword }, res)) {
                return;
            }
            try {
                const datos = yield this.user.getByField("username", username);
                if (Array.isArray(datos) || datos != null) {
                    return res.status(500).json({ msj: "El usuario ya existe" });
                }
                const oUsers = new users_1.users();
                oUsers.status = status;
                oUsers.username = username;
                oUsers.userpassword = userpassword;
                yield this.user.create(oUsers);
                return res.status(200).json({ msj: "Usuario Registrado exitosamente" });
            }
            catch (error) {
                return res.status(500).json({ msj: "Error al obtener la lista por id" });
            }
        });
    }
    /**
     * Actualiza la información de un usuario
     * Validaciones:
     * - ID existente
     * - Campos requeridos
     * - Nombre de usuario único
     */
    updateUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_users } = req.params;
            if ((0, ValidationParams_1.ValidarFuncionParams)(req, res, "id_users")) {
                return;
            }
            const { status, username, userpassword } = req.body;
            if ((0, ValidationParams_1.ValidarFuncionReq)({ status, username, userpassword }, res)) {
                return;
            }
            try {
                const oUsers = yield this.user.getByField("id_users", id_users);
                if (Array.isArray(oUsers) || oUsers == null) {
                    return res.status(200).json({
                        msj: "No se pudo encontrar al usuario",
                    });
                }
                if (oUsers.username == username && oUsers.id_users != id_users) {
                    return res.status(200).json({
                        msj: "El nombre del usuario ya existe",
                    });
                }
                oUsers.status = status;
                oUsers.username = username;
                oUsers.userpassword = userpassword;
                yield this.user.update(oUsers);
                return res.json({
                    msj: "Registro del usuario se actualizo exitosamente",
                });
            }
            catch (error) {
                return res.status(500).json({ msj: "Error en el servidor" });
            }
        });
    }
    /**
     * Eliminación lógica de usuario (cambio de status a 2)
     * Validaciones:
     * - ID existente
     * - Usuario activo
     */
    deleteUsersById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_users } = req.params;
            if ((0, ValidationParams_1.ValidarFuncionParams)(req, res, "id_users")) {
                return;
            }
            try {
                const oUsers = yield this.user.getByField("id_users", id_users);
                if (oUsers == null || Array.isArray(oUsers)) {
                    return res.status(404).json({
                        msj: "No se encontró el usuario",
                    });
                }
                oUsers.status = 2;
                yield this.user.update(oUsers);
                return res.status(200).json({
                    msj: "Usuario eliminado correctamente",
                });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ msj: "Error en el servidor" });
            }
        });
    }
}
exports.UsersService = UsersService;
