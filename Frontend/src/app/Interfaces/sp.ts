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
    formatos: string
    estado: string;
    id_status : number;
}
export interface getTotalArea{
    name: string;
    totales: number;
}
export interface verificar_formats_modelos_rango2{
    formats_models: string;
    anio: string;
    modelo_completo: string;
    area: string ;
    fecha: string;
}
export interface GetAreaCountByStatus{
    nombre: string 
    contador: number
}