import "reflect-metadata";
export function Table(name: string) {
  return function (constructor: Function) {
    Reflect.defineMetadata("tableName", name, constructor);
  };
}

export function PrimaryKey(){
  return function (target: any, propertykey: string) {
    Reflect.defineMetadata("primaryKey", propertykey, target.constructor);
  };
}