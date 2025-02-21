"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const register_c_1 = require("../Global/Config/register.c");
const env_1 = require("../Global/Environment/env");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const base_1 = require("../Global/Config/base");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        this.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
    }
    routes() {
        const controllersApi = [
            base_1.Controllers.UsersControllers,
            base_1.Controllers.FormatsControllers,
            base_1.Controllers.TurnoControllers,
            base_1.Controllers.AreaControllers
        ];
        (0, register_c_1.RegisterRoutes)(this.app, controllersApi);
    }
    start() {
        return new Promise((resolve) => {
            this.app.listen(env_1.env.PORT, () => {
                console.log(`Servidor iniciado en http://localhost:${env_1.env.PORT}`);
                resolve();
            });
        });
    }
}
exports.App = App;
