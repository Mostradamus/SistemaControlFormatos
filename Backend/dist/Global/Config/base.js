"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controllers = void 0;
const users_ctrl_1 = require("../../Core/Controllers/users.ctrl");
const formats_ctrl_1 = require("../../Core/Controllers/formats.ctrl");
const area_ctrl_1 = require("../../Core/Controllers/area.ctrl");
const turno_ctrl_1 = require("../../Core/Controllers/turno.ctrl");
exports.Controllers = { UsersControllers: users_ctrl_1.UsersControllers, FormatsControllers: formats_ctrl_1.FormatsControllers, AreaControllers: area_ctrl_1.AreaControllers, TurnoControllers: turno_ctrl_1.TurnoControllers };
