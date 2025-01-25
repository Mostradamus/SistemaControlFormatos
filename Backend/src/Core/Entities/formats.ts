import { PrimaryKey, Table } from "../../Global/Decorators/models.dc";
@Table("formats")
export class formats {
  @PrimaryKey()
  id_formats?: number;
  status?: number;
  id_area?: number;
  starting_order?: string;
  total?: number;
  registration_date?: Date;
  id_turn?: number;
  description?: string;
}