import { Response, Request } from "express";
import { QueryGlobal } from "../../../Global/Config/Query";
import { IfReportsService } from "../InterfaceServices/reports.i";
import { ComparisonResult } from "../../Entities/comparisonResult";

export class ReportsServices implements IfReportsService{
  public comparison; 
  constructor() {
    this.comparison = new QueryGlobal(ComparisonResult);
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
}