export class sp_mostrar_formats{
    id          : number = 0;
    estado      : number = 0;
    total       : number = 0;
    area        : string = '';
    nrformatos  : string = '';
    nroInicio   : string = '';
    nrFinal     : string = '';
    turno       : string = '';
    description : string = '';
    fecha_registro: string = '';
}

export class sp_verificar_registro{
    estado: number= 0;
}
export class GetGroupedFormatsByDate{
    name : string = '';
    id_areas : number= 0;
}
export class GetFormatDetailsByAreaAndDate{
    formats_models	: string ='';
    formatos: string = '';
    estado: string = '';
    id_area : number = 0;
    id_formats_details : number= 0;
    status: number = 0;
}
export class verificar_formats_model{
    formats_model: string = '';
}

export class getTotalByArea{
    name : string = '';
    totales : number = 0;
}
export class sp_ObtenerTotalFormatos{
    total: number = 0;
}
export class GetAreaCountByStatus{
    nombre: string =''
    contador: number = 0
}
export class sp_message_comparison{
    mensaje: string = '';
    total: number = 0;
    tipo: string = '';
}
