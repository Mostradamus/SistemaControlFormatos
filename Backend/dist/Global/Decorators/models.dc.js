"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = Table;
exports.PrimaryKey = PrimaryKey;
require("reflect-metadata");
function Table(name) {
    return function (constructor) {
        Reflect.defineMetadata("tableName", name, constructor);
    };
}
function PrimaryKey() {
    return function (target, propertykey) {
        Reflect.defineMetadata("primaryKey", propertykey, target.constructor);
    };
}
