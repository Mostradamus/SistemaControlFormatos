import { PrimaryKey, Table } from "../../Global/Decorators/models.dc";
@Table("comparison_result_details")
export class ComparisonResultDetails {
  @PrimaryKey()
  id_comparison_details?: number;
  id_comparison?: number;
  registration_date_comparison_details?: Date;
  model_format?: string;
  area_comparison?: string;
}