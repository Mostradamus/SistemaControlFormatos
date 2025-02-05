"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.FormatsControllers = void 0;
const routes_dc_1 = require("../../Global/Decorators/routes.dc");
const formats_s_1 = require("../Contents/Services/formats.s");
class FormatsControllers {
    constructor() {
        this.FormatsServices = new formats_s_1.FormatsServices();
    }
    getF(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.FormatsServices.getAllFormats(res);
        });
    }
    getListaF(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.FormatsServices.getAllFormatSp(res);
        });
    }
    insertF(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.FormatsServices.insertFormats(req, res);
        });
    }
    comprobar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(11);
            return this.FormatsServices.comprobarFormatos(req, res);
        });
    }
    deleteF(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.FormatsServices.deleteFormatsById(req, res);
        });
    }
    ActualizarRevision(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.FormatsServices.updateFormatsDetails(req, res);
        });
    }
}
exports.FormatsControllers = FormatsControllers;
__decorate([
    (0, routes_dc_1.Get)("/formatos"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FormatsControllers.prototype, "getF", null);
__decorate([
    (0, routes_dc_1.Get)("/formatos/Lista"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FormatsControllers.prototype, "getListaF", null);
__decorate([
    (0, routes_dc_1.Post)("/formatos/crear"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FormatsControllers.prototype, "insertF", null);
__decorate([
    (0, routes_dc_1.Post)("/formatos/comprobar/formatos"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FormatsControllers.prototype, "comprobar", null);
__decorate([
    (0, routes_dc_1.Delete)("/formatos/eliminar"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FormatsControllers.prototype, "deleteF", null);
__decorate([
    (0, routes_dc_1.Put)('/formatos/actualizarEstado/:id_formats_details'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FormatsControllers.prototype, "ActualizarRevision", null);
