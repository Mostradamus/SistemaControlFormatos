"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const register_c_1 = require("../Global/Config/register.c");
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const base_1 = require("../Global/Config/base");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
    }
    routes() {
        const controllersApi = [
            base_1.Controllers.UsersControllers, base_1.Controllers.FormatsControllers
        ];
        (0, register_c_1.RegisterRoutes)(this.app, controllersApi);
    }
    start() {
        return new Promise((resolve) => {
            this.app.listen(3000, () => {
                console.log("Servidor iniciado en http://localhost:3000");
                resolve();
            });
        });
    }
}
exports.App = App;
