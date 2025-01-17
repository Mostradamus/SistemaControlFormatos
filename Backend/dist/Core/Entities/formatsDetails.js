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
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatsDetails = void 0;
const models_dc_1 = require("../../Global/Decorators/models.dc");
let formatsDetails = class formatsDetails {
};
exports.formatsDetails = formatsDetails;
__decorate([
    (0, models_dc_1.PrimaryKey)(),
    __metadata("design:type", Number)
], formatsDetails.prototype, "id_formats_details", void 0);
exports.formatsDetails = formatsDetails = __decorate([
    (0, models_dc_1.Table)("formats_details")
], formatsDetails);
