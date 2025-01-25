import { PrimaryKey, Table } from "../../Global/Decorators/models.dc";
@Table("turn")
export class turn{
    @PrimaryKey()
    id_turn?: number;
    status?: number;
    name?: string;
}