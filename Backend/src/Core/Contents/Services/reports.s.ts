import { Response, Request } from "express";
import { QueryGlobal } from "../../../Global/Config/Query";
import { IfReportsService } from "../InterfaceServices/reports.i";
import { ComparisonResult } from "../../Entities/comparisonResult";
import { ComparisonResultDetails } from "../../Entities/comparisonResultDetails";
import { StoreProcedure } from "../../../Global/Config/StoreProcedure";
import { GetAreaCountByStatus } from "../../Entities/Procedures/sp_mostrar_formats";

export class ReportsServices implements IfReportsService{
  public comparison; 
  public comparisonDetail; 
  private sp;
  constructor() {
    this.comparison = new QueryGlobal(ComparisonResult);
       this.sp = new StoreProcedure();
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
  async getTotalStatusAreaCount(req: Request, res: Response){
    const {id_status } = req.params;
    console.log(id_status)
    try {
      // const all = await this.comparisonDetail.getByField('id_comparison', id_comparison);
      const result =
             await this.sp.executeStoredProcedureForList<GetAreaCountByStatus>(
               "GetAreaCountByStatus",0, [id_status]
             );
             console.log(result)
           return res.status(200).json(result);
    } catch (error) {
      return res
      .status(500)
      .json({ msj: "Error al obtener la lista de formastos" });
    }
  }
}