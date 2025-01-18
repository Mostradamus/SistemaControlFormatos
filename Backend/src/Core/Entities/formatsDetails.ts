import { PrimaryKey, Table } from "../../Global/Decorators/models.dc";
@Table("formats_details")
export class formatsDetails{
    @PrimaryKey()
    id_formats_details?: number;
    id_formats?: number;
    status?: number;
    formats_models?: string;
}