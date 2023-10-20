import { Request, Response } from 'express';
import pool from '../database';

class LibrosController {

    public async list(req: Request, res: Response): Promise <void>{
        console.log(req.params)
        const consulta = 'SELECT * FROM libros';
        console.log(consulta);
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
    public async listOne(req: Request, res: Response): Promise <void>{
        console.log(req.params);
        const {id} = req.params;
        const consulta = 'SELECT * FROM libros WHERE id = '+ id;
        //console.log(consulta);
        const respuesta = await pool.query(consulta);
        if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
        }
        res.status(404).json({'mensaje': 'Libro no encontrado'});
        }

        
    public async createlibros(req: Request, res: Response): Promise <void>{
        console.log(req.body);
        const resp = await pool.query("INSERT INTO libros set ?",[req.body]);
        res.json(resp);
    }
    public async insertarlibro(req: Request, res: Response): Promise<void> {
        console.log(req.body);        
        let libros=req.body;

        for(var i=0; i<libros.length;i++){ 
        const resp = await pool.query(`INSERT INTO libros set titulo= '${libros[i].titulo}', autor= '${libros[i].autor}',
                                       disponibles= '${libros[i].disponibles}', editorial= '${libros[i].editorial}',
                                       area= '${libros[i].area}'`);
        res.json(resp);
    }

    }
    public async updatelibros(req: Request, res: Response): Promise <void>{
        const { idLibro } = req.params;
        console.log(req.params);
        const resp = await pool.query("UPDATE libros set ? WHERE id = ?", [req.body, idLibro]);
        res.json(resp);
    }
    public async deletelibros(req: Request, res: Response): Promise <void>{
        const { idLibro } = req.params;
        const resp = await pool.query(`DELETE FROM libros WHERE id = ${idLibro}`);
        res.json(resp);
    }



    public async verificaLibros(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        const consulta = `SELECT * FROM libros WHERE titulo="${req.body.titulo}" and cantidad="${req.body.cantidad}"`;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);

    }

}
export const librosController = new LibrosController();

