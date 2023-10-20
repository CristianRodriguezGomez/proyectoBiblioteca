import { Request, Response } from 'express';
import pool from '../database';

class CarrerasController {
    public async list(req: Request, res: Response): Promise<void> {
        console.log(req.params)
        const consulta = 'SELECT * FROM carreras';
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
    public async listOne(req: Request, res: Response): Promise <void>{
        console.log(req.params);
        const {id} = req.params;
        const consulta = 'SELECT * FROM carreras WHERE id = '+ id;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
        }
        res.status(404).json({'mensaje': 'carrera no encontrada'});
        }

    public async createcarreras(req: Request, res: Response): Promise<void> {
        console.log(req.body);        
        const resp = await pool.query("INSERT INTO carreras set ?",
            [req.body]);
        res.json(resp);
     

    }
    public async insertacarrera(req: Request, res: Response): Promise<void> {
        console.log(req.body);        
        let carreras=req.body;

        for(var i=0; i<carreras.length;i++){ 
        const resp = await pool.query(`INSERT INTO carreras set area= '${carreras[i].area}'`);
        res.json(resp);
    }

    }
    public async updatecarreras(req: Request, res: Response): Promise<void> {
        const { idCarrera } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE carreras set ? WHERE id = ?", [req.body, idCarrera]);
        res.json(resp);
    }
    public async deletecarreras(req: Request, res: Response): Promise<void> {
        const { idCarrera } = req.params;
        const resp = await pool.query(`DELETE FROM carreras WHERE id = ${idCarrera}`);
        res.json(resp);
    }

    
    
}
export const carrerasController = new CarrerasController();

