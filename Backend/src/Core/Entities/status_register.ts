import { PrimaryKey, Table } from "../../Global/Decorators/models.dc";
@Table("status_register")
export class statusRegister{
    @PrimaryKey()
    id_status?: number;
    description?: string;
}