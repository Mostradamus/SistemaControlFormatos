/**
 * Servicio para la gestión de usuarios
 * Implementa las operaciones CRUD y validaciones de seguridad
 */
import { Response, Request } from "express";
import { QueryGlobal } from "../../../Global/Config/Query";
import { users } from "../../Entities/users";
import { IusersService } from "../InterfaceServices/users.i";
import bcrypt from 'bcrypt';
import jsw from 'jsonwebtoken'
import {
  ValidarFuncionParams,
  ValidarFuncionReq,
} from "../../Helpers/ValidationParams";

export class UsersService implements IusersService {
  public user;
  constructor() {
    // Inicializa el query global para usuarios

    this.user = new QueryGlobal(users);
  }
  

  /**
   * Obtiene todos los usuarios del sistema
   */
  async getAllUsers(res: Response) {
    try {
      const all = await this.user.getAll();
      return res.status(200).json(all);
    } catch (error) {
      return res
        .status(500)
        .json({ msj: "Error al obtener la lista de usuarios" });
    }
  }

  /**
   * Busca un usuario por ID
   * Incluye validación de parámetros
   */
  async findUsersById(req: Request, res: Response) {
    const { id_users }: users = req.params;
    if (ValidarFuncionParams(req, res, "id_users")) {
      return;
    }
    try {
      const allById = await this.user.getByField("id_users", id_users);
      if (Array.isArray(allById) || allById == null) {
        return res.status(500).json({ msj: "El Usuario no exite" });
      }
      return res.status(200).json(allById);
    } catch (error) {
      return res.status(500).json({ msj: "Error al obtener la lista por id" });
    }
  }
 
  async loginValid(req: Request, res: Response) {
    const { username, userpassword }: users = req.body;
    if (ValidarFuncionReq({ username, userpassword }, res)) {
      return;
    }
  
    try {
      const getInfo = await this.user.selectQuery(
        "SELECT * FROM users WHERE username = ? and id_status=1",
        [username]
      );
  
      // Verificar si getInfo es nulo o si es un array vacío
      if (!getInfo || (Array.isArray(getInfo) && getInfo.length === 0)) {
        console.log(1);
        return res.status(500).json({ msj: "El usuario no fue encontrado" });
      }
  
      // Asegurarse de que getInfo siempre sea un objeto, no un array
      const user = Array.isArray(getInfo) ? getInfo[0] : getInfo;
  
      // Verificar la contraseña
      const match = await bcrypt.compare(String(userpassword), String(user.userpassword));
      if (!match) return res.status(404).json({ msj: "Contraseña incorrecta" });
  
      // Obtener el usuario por ID
      let usersW = await this.user.getByField("id_users", user.id_users);
  
      if (!usersW || (Array.isArray(usersW) && usersW.length === 0)) {
        return res.status(500).json({ msj: "Error al obtener el usuario" });
      }
  
      const userData = Array.isArray(usersW) ? usersW[0] : usersW;
      let nameW = userData.username;
      let id = userData.id_users;
  
      const token = jsw.sign({ nameW }, "112oaasvsasasyw", { expiresIn: "1h" });
  
      return res.status(200).json({ token, id });
    } catch (error) {
      console.error("Error en loginValid:", error);
      return res.status(500).json({ msj: "Error en el servidor" });
    }
  }
  
  // async loginValid(req: Request, res: Response){
  //     const {username, userpassword}: users = req.body;
  //     if (ValidarFuncionReq({username, userpassword}, res)) {
  //       return;
  //     }
  //     console.log(username)
  //     try {
  //       const getInfo = await this.user.selectQuery("SELECT * FROM users WHERE username = ? and id_status=1",[username]);
  //       console.log(getInfo)
  //       if(!Array.isArray(getInfo) || getInfo.length === 0 || getInfo == null){
  //         console.log(1)
  //         return res.status(500).json({msj:"El usuario no fue encontrado"})
  //       }else{
  //         console.log(typeof getInfo)
  //         const user = getInfo[0];
  //         const match = await bcrypt.compare(String(userpassword), String(user.userpassword));
  //         if(!match) return res.status(404).json({msj: 'Contraseña incorrecta'});
  //         let usersW = await this.user.getByField('id_users',user.id_users)
  //         if(Array.isArray(usersW) || usersW == null)return
  //           let nameW = usersW.username;
  //           let id = usersW.id_users;
  //           const token = jsw.sign({nameW}, '112oaasvsasasyw', {expiresIn: '1h'})
  //           return res.status(200).json({token,id})
          
  //       }
  //     } catch (error) {
  //       return res.status(500).json({ msj: "Error al obtener la lista por id" });
  //     }

  // }

  /**
   * Crea un nuevo usuario
   * Incluye validaciones:
   * - Campos requeridos
   * - Usuario no existente
   */

  async insertUsers(req: Request, res: Response) {

    const { username, userpassword }: users = req.body;
    if (ValidarFuncionReq({ username, userpassword }, res)) {
      return;
    }
    try {
      const datos = await this.user.getByField("username", username);
      
      if (Array.isArray(datos) || datos != null) {
        return res.status(500).json({ msj: "El usuario ya existe" });
      }
      const hash = await bcrypt.hash(String(userpassword), 10);
      const oUsers = new users();
      oUsers.id_status = 1;
      oUsers.username = username;
      oUsers.userpassword = hash;
      await this.user.create(oUsers);
      return res.status(200).json({ msj: "Usuario Registrado exitosamente" });
    } catch (error) {
      return res.status(500).json({ msj: "Error al obtener la lista por id" });
    }
  }

  /**
   * Actualiza la información de un usuario
   * Validaciones:
   * - ID existente
   * - Campos requeridos
   * - Nombre de usuario único
   */

  async updateUsers(req: Request, res: Response) {
    const { id_users }: users = req.params;
    if (ValidarFuncionParams(req, res, "id_users")) {
      return;
    }
    const { id_status, username, userpassword }: users = req.body;
    if (ValidarFuncionReq({ status, username, userpassword }, res)) {
      return;
    }
    try {
      const oUsers = await this.user.getByField("id_users", id_users);
      if (Array.isArray(oUsers) || oUsers == null) {
        return res.status(200).json({
          msj: "No se pudo encontrar al usuario",
        });
      }

      if (oUsers.username == username && oUsers.id_users!= id_users) {
        return res.status(200).json({
          msj: "El nombre del usuario ya existe",
        });
      }
      oUsers.id_status = id_status;
      oUsers.username = username;
      oUsers.userpassword = userpassword;
      await this.user.update(oUsers);
      return res.json({
        msj: "Registro del usuario se actualizo exitosamente",
      });
    } catch (error) {
      return res.status(500).json({ msj: "Error en el servidor" });
    }
  }

  /**
   * Eliminación lógica de usuario (cambio de status a 2)
   * Validaciones:
   * - ID existente
   * - Usuario activo
   */

  async deleteUsersById(req: Request, res: Response){
    const { id_users }: users = req.params;
    if (ValidarFuncionParams(req, res, "id_users")) {
      return;
    }
    try {
      const oUsers = await this.user.getByField("id_users", id_users);
      if (oUsers == null || Array.isArray(oUsers)) {
        return res.status(404).json({
          msj: "No se encontró el usuario",
        });
      }
      oUsers.id_status = 2;

      await this.user.update(oUsers);
      return res.status(200).json({
        msj: "Usuario eliminado correctamente",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msj: "Error en el servidor" });
    }
  }
}
