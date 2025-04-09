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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const Query_1 = require("../../../Global/Config/Query");
const users_1 = require("../../Entities/users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ValidationParams_1 = require("../../Helpers/ValidationParams");
class UsersService {
    constructor() {
        this.user = new Query_1.QueryGlobal(users_1.users);
    }
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
    loginValid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, userpassword } = req.body;
            if ((0, ValidationParams_1.ValidarFuncionReq)({ username, userpassword }, res)) {
                return;
            }
            try {
                const getInfo = yield this.user.selectQuery("SELECT * FROM users WHERE username = ? and id_status=1", [username]);
                // Verificar si getInfo es nulo o si es un array vacío
                if (!getInfo || (Array.isArray(getInfo) && getInfo.length === 0)) {
                    return res.status(500).json({ msj: "El usuario no fue encontrado" });
                }
                // Asegurarse de que getInfo siempre sea un objeto, no un array
                const user = Array.isArray(getInfo) ? getInfo[0] : getInfo;
                // Verificar la contraseña
                const match = yield bcrypt_1.default.compare(String(userpassword), String(user.userpassword));
                if (!match)
                    return res.status(404).json({ msj: "Contraseña incorrecta" });
                // Obtener el usuario por ID
                let usersW = yield this.user.getByField("id_users", user.id_users);
                if (!usersW || (Array.isArray(usersW) && usersW.length === 0)) {
                    return res.status(500).json({ msj: "Error al obtener el usuario" });
                }
                const userData = Array.isArray(usersW) ? usersW[0] : usersW;
                let nameW = userData.username;
                let id = userData.id_users;
                const token = jsonwebtoken_1.default.sign({ nameW }, "112oaasvsasasyw", { expiresIn: "1h" });
                return res.status(200).json({ token, id });
            }
            catch (error) {
                return res.status(500).json({ msj: "Error en el servidor" });
            }
        });
    }
    insertUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, userpassword } = req.body;
            if ((0, ValidationParams_1.ValidarFuncionReq)({ username, userpassword }, res)) {
                return;
            }
            try {
                const datos = yield this.user.getByField("username", username);
                if (Array.isArray(datos) || datos != null) {
                    return res.status(500).json({ msj: "El usuario ya existe" });
                }
                const hash = yield bcrypt_1.default.hash(String(userpassword), 10);
                const oUsers = new users_1.users();
                oUsers.id_status = 1;
                oUsers.username = username;
                oUsers.userpassword = hash;
                yield this.user.create(oUsers);
                return res.status(200).json({ msj: "Usuario Registrado exitosamente" });
            }
            catch (error) {
                return res.status(500).json({ msj: "Error al obtener la lista por id" });
            }
        });
    }
    updateUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_users } = req.params;
            if ((0, ValidationParams_1.ValidarFuncionParams)(req, res, "id_users")) {
                return;
            }
            const { id_status, username, userpassword } = req.body;
            if ((0, ValidationParams_1.ValidarFuncionReq)({ status, username, userpassword }, res)) {
                return;
            }
            try {
                const oUsers = yield this.user.getByField("id_users", id_users);
                if (Array.isArray(oUsers) || oUsers == null) {
                    return res.status(200).json({ msj: "No se pudo encontrar al usuario" });
                }
                if (oUsers.username == username && oUsers.id_users != id_users) {
                    return res.status(200).json({ msj: "El nombre del usuario ya existe" });
                }
                oUsers.id_status = id_status;
                oUsers.username = username;
                oUsers.userpassword = userpassword;
                yield this.user.update(oUsers);
                return res.json({ msj: "Registro del usuario se actualizo exitosamente" });
            }
            catch (error) {
                return res.status(500).json({ msj: "Error en el servidor" });
            }
        });
    }
    deleteUsersById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_users } = req.params;
            if ((0, ValidationParams_1.ValidarFuncionParams)(req, res, "id_users")) {
                return;
            }
            try {
                const oUsers = yield this.user.getByField("id_users", id_users);
                if (oUsers == null || Array.isArray(oUsers)) {
                    return res.status(404).json({ msj: "No se encontró el usuario" });
                }
                oUsers.id_status = 2;
                yield this.user.update(oUsers);
                return res.status(200).json({ msj: "Usuario eliminado correctamente" });
            }
            catch (error) {
                return res.status(500).json({ msj: "Error en el servidor" });
            }
        });
    }
}
exports.UsersService = UsersService;
