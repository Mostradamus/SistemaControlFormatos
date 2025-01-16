import { PrimaryKey, Table } from "../../Global/Decorators/models.dc";
@Table("formats")
export class formats {
  @PrimaryKey()
  id_formats?: number;
  status?: number;
  starting_order?: String;
  total?: number;
  registration_date?: Date;
  turn?: number;
  description?: string;
}