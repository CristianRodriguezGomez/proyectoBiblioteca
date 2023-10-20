import { Request, response, Response } from 'express';
import pool from '../database';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
class UsuariosController {
    //CRUD

    public async list(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        const consulta = `SELECT * FROM usuarios `;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
    public async createusuarios(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        let pass = req.body.password;
        console.log(pass);
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        console.log(req.body.password);
        let prueba = await bcrypt.compare("a", req.body.password);
        console.log(prueba);
        const resp = await pool.query("INSERT INTO usuarios set ?", [req.body]);
        res.json(resp);
    }
    public async updateusuarios(req: Request, res: Response): Promise<void> {
        const { idUsuario } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE usuarios set ? WHERE id = ?", [req.body, idUsuario]);
        res.json(resp);
    }
    public async deleteusuarios(req: Request, res: Response): Promise<void> {
        const { idUsuario } = req.params;
        const resp = await pool.query(`DELETE FROM usuarios WHERE id = ${idUsuario}`);
        res.json(resp);
    }

    //SERVICIOS

    /*public async verificaUsuario(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        const consulta = `SELECT usuarios.rol FROM usuarios WHERE email="${req.body.email}" AND password="${req.body.password}"`;
        const respuesta = await pool.query(consulta);
        if (respuesta.length == 0) {
            res.json(null)
        } else {
            res.json(respuesta);
        }

    }
*/

public async verificaUsuario(req: Request, res: Response): Promise<void> {
    console.log(req.params);
    const consulta = `SELECT * FROM usuarios WHERE email="${req.body.email}"`;
    console.log(consulta);
    const respuesta = await pool.query(consulta);
   
    if (respuesta.length > 0) {
      bcrypt.compare(req.body.password,respuesta[0].password,(err, resEncriptar) => {
          if (resEncriptar == true) {
            res.json(respuesta);
          } else {
          
            res.json(null);
          }
        }
      );
    } else {
      res.json(null);
    }
    /* console.log(req.body)*/
  }

    public async listOne(req: Request, res: Response): Promise<void> {
        console.log(req.params);
        const { id } = req.params;
        const consulta = 'SELECT * FROM usuarios WHERE id = ' + id;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Materia no encontrado' });
    }



    public async generaToken(req: Request, res: Response): Promise<void> {
        const { email } = req.params;
        let consulta = "SELECT * FROM usuarios WHERE email = '" + email + "'";
        const respuesta = await pool.query(consulta);
        if (respuesta.length > 0) {
            const token: string = jwt.sign(email, process.env.TOKEN_SECRET || 'prueba');
            res.json({ "idUsuario": respuesta[0].idUsuario, "token": token });
        }
        else
            res.json({ "idUsuario": -1, "token": "" });
    }
    public async CambiarPassword(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        let pass = req.body.password;
        let cor = req.body.email;
        console.log(pass, cor);
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        console.log("nuevacontra",req.body.password)

        console.log(req.body.email)
        const resp = await pool.query(`UPDATE usuarios set password="${req.body.password}" where usuarios.email="${req.body.email}"`)
       res.json(resp);
    }
}
export const usuariosController = new UsuariosController();

