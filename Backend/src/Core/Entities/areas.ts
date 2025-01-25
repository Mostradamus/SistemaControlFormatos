import { PrimaryKey, Table } from "../../Global/Decorators/models.dc";
@Table("areas")
export class areas{
    @PrimaryKey()
    id_areas?: number;
    status?: number;
    name?: string;
}