// Importamos la configuración de variables de entorno
import 'dotenv/config'

const HOST_DB   = process.env.HOST_DB || "localhost";    
const USER_DB   = process.env.USER_DB || "root";    
const PS_DB     = process.env.PS_DB   || "";   
const DB        = process.env.DB      || "dbcentroamerica1";    
const PORT      = process.env.PORT    || 5000;         
const SERIE     = process.env.SERIE   || "00000000";

export const env = {HOST_DB, USER_DB, PS_DB, DB, PORT, SERIE}  