import { PrimaryKey, Table } from "../../Global/Decorators/models.dc";
@Table("comparison_result")
export class ComparisonResult {
  @PrimaryKey()
  id_comparison?: number;
  name_area_comparison?: string;
  registration_date_comparison?: Date;
  total_quantity?: number;
}