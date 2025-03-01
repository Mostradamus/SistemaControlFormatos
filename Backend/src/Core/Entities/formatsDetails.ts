import { PrimaryKey, Table } from "../../Global/Decorators/models.dc";
@Table("formats_details")
export class formatsDetails{
    @PrimaryKey()
    id_formats_details?: number;
    id_formats?: number;
    nro_serie?: string;
    anio?: string;
    id_status?: number;
    formats_models?: string;
    orden?: number
}