import { Request, Response } from "express";
export interface IfReportsService {
  getReports(res: Response): void;
  getReportID(req: Request, res: Response): void;
}
