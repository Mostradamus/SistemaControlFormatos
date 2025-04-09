import { Response, Request } from "express";

export function ValidarFuncionReq(obj: Record<string, any>, res: Response) {
  const camposFaltantes = Object.keys(obj).filter((key) => !obj[key]);

  if (camposFaltantes.length > 0) {
    return res.status(400).json({
      msj: `Faltan los siguientes datos en la solicitud: ${camposFaltantes.join(
        ", "
      )}`,
    });
  }
}

export function ValidarFuncionParams(req: Request,res: Response, ...campos: string[]) {
  const paramsFaltantes = campos.filter((campo) => !req.params[campo]);

  if (paramsFaltantes.length > 0) {
    res.status(400).json({
      msj: `Faltan los siguientes parámetros en la solicitud: ${paramsFaltantes.join(
        ", "
      )}`,
    });
    return true;
  }

  return false;
}
