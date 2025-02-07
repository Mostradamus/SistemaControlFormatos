export interface sp_mostrar_formats{
    id          : number;
    estado      : number;
    total       : number;
    area        : string;
    nrformatos  : string;
    turno       : string;
    nrFinal : string;
    description: string;
    nroInicio : string;
    fecha_registro: string;
}
export interface GetGroupedFormatsByDate{
    name : string ;
    id_areas : number;
}
export interface GetFormatDetailsByAreaAndDate{
    formats_models: string;
    id_area: number;
    id_formats_details: number;
    id_status : number;
}
export interface getTotalArea{
    name: string;
    totales: number;
}