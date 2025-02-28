import { ComparisonResult } from "./comparisonResult";
import { ComparisonResultDetails } from "./comparisonResultDetails";

export interface ResultBody {
    cabecera: ComparisonResult;
    detalles: ComparisonResultDetails[];
    detallesLista: any[];
    status: number
  }