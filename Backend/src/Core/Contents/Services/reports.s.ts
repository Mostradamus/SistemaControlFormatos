import { Response, Request } from "express";
import { QueryGlobal } from "../../../Global/Config/Query";
import { IfReportsService } from "../InterfaceServices/reports.i";
import { ComparisonResult } from "../../Entities/comparisonResult";
import { ComparisonResultDetails } from "../../Entities/comparisonResultDetails";

export class ReportsServices implements IfReportsService{
  public comparison; 
  public comparisonDetail; 
  constructor() {
    this.comparison = new QueryGlobal(ComparisonResult);
    this.comparisonDetail = new QueryGlobal(ComparisonResultDetails);
  }
  async getReports(res: Response) {
    try {
      const all = await this.comparison.getAll();
      return res.status(200).json(all);
    } catch (error) {
      return res
        .status(500)
        .json({ msj: "Error al obtener la lista de formastos" });
    }
  }
  async getReportID(req: Request, res: Response){
    const {id_comparison}: ComparisonResultDetails = req.params;
    try {
      // const all = await this.comparisonDetail.getByField('id_comparison', id_comparison);
      const getall = await this.comparisonDetail.selectQuery("SELECT * FROM comparison_result_details WHERE id_comparison = ? ",[id_comparison]);
      return res.status(200).json(getall);
    } catch (error) {
      return res
      .status(500)
      .json({ msj: "Error al obtener la lista de formastos" });
    }

  }
}