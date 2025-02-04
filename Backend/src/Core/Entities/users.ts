import { PrimaryKey, Table } from "../../Global/Decorators/models.dc";

@Table("users")
export class users {
  @PrimaryKey()
  id_users?: number;
  id_status?: number;
  username?: string;
  userpassword?: string;
}