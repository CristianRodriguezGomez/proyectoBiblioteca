import { Request, Response } from 'express';
import pool from '../database';
class EstudiantesController {

    
    public async list(req: Request, res: Response): Promise<void> {
        const consulta = 'SELECT * FROM estudiantes';
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
    public async listOne(req: Request, res: Response): Promise <void>{
        console.log(req.params);
        const {id} = req.params;
        const consulta = 'SELECT * FROM estudiantes WHERE id = '+ id;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
        }
        res.status(404).json({'mensaje': 'Estudiante no encontrado'});
        }

    public async createestudiantes(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        const resp = await pool.query("INSERT INTO estudiantes set ?",[req.body]);
        res.json(resp);
    }

    public async insertarestudiante(req: Request, res: Response): Promise<void> {
        console.log(req.body);        
        let estudiantes=req.body;

        for(var i=0; i<estudiantes.length;i++){ 
        const resp = await pool.query(`INSERT INTO estudiantes set nombre= '${estudiantes[i].nombre}', idCarrera= '${estudiantes[i].idCarrera}',
                                       correo= '${estudiantes[i].correo}', telefono= '${estudiantes[i].telefono}',
                                       direccion= '${estudiantes[i].direccion}'`);
        res.json(resp);
    }

    }
    public async updateestudiantes(req: Request, res: Response): Promise<void> {
        const { idEstudiante } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE estudiantes set ? WHERE id = ?", [req.body, idEstudiante]);
        res.json(resp);
    }
    public async deleteestudiantes(req: Request, res: Response): Promise<void> {
        const { idEstudiante } = req.params;
        const resp = await pool.query(`DELETE FROM estudiantes WHERE id = ${idEstudiante}`);
        res.json(resp);
    }



    public async verificaEstudiante(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        const consulta = `SELECT * FROM estudiantes WHERE nombre="${req.body.nombre}" and carrera="${req.body.carrera}"`;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);

    }

 
}
export const estudiantesController = new EstudiantesController();
