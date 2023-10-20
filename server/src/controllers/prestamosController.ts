import { Request, response, Response } from 'express';
import pool from '../database';
class PrestamosController {
    
    public async list(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        const consulta = `SELECT * FROM prestamos`;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);
    }
    public async listOne(req: Request, res: Response): Promise <void>{
        console.log(req.params);
        const {id} = req.params;
        const consulta = 'SELECT * FROM prestamos WHERE id = '+ id;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        if(respuesta.length>0){
        res.json(respuesta[0]);
        return ;
        }
        res.status(404).json({'mensaje': 'Prestamo no encontrado'});
        }

    public async createprestamos(req: Request, res: Response): Promise<void> {
        console.log(req.body);
        console.log(req.body['id_libro']);

        const {id, id_libro} = req.body;
        console.log(id_libro);

        const resp = await pool.query("INSERT INTO prestamos SET ?",[req.body]);
        const resp2 = await pool.query(`UPDATE libros SET disponibles = disponibles-1 WHERE id= ${id_libro}`)
        res.json(resp);
      
    }
    
    public async updateprestamos(req: Request, res: Response): Promise<void> {
        const { idPrestamo } = req.params;
        console.log(req.params);
        const {id, id_libro} = req.body;
        console.log(id_libro);

        const resp = await pool.query("UPDATE prestamos set ? WHERE id = ?", [req.body, idPrestamo]);
        const resp2 = await pool.query(`UPDATE libros SET disponibles = disponibles+1 WHERE id= ${id_libro}`)
        res.json(resp);

    }
    public async deleteprestamos(req: Request, res: Response): Promise<void> {
        const { idPrestamo } = req.params;
        const resp = await pool.query(`DELETE FROM prestamos WHERE id = ${idPrestamo}`);
        res.json(resp);
    }


    public async verificaPrestamo(req: Request, res: Response): Promise<void> {
        console.log(req.body)
        const consulta = `SELECT * FROM prestamos WHERE id_estudiante="${req.body.id_estudiante}" and id_libro="${req.body.id_libro}"`;
        console.log(consulta)
        const respuesta = await pool.query(consulta);
        console.log(respuesta);
        res.json(respuesta);

    }

}
export const prestamosController = new PrestamosController();

//SELECT libros.id, libros.titulo,libros.cantidad FROM libros INNER JOIN prestamos ON libros.id = prestamos.id`
//SELECT  l.id, e.nombre, l.titulo, p.cantidadLibros, p.fechaPrestamo, p.horaPrestamo, p.fechaDevolucion, p.observacion FROM prestamos AS p JOIN libros AS l ON l.id = p.id RIGHT JOIN estudiantes AS e ON e.id = p.id;
//SELECT  l.id, e.id, l.titulo, p.cantidadLibros, p.fechaPrestamo, p.horaPrestamo, p.fechaDevolucion, p.observacion FROM prestamos AS p JOIN libros AS l ON l.id = p.id RIGHT JOIN estudiantes AS e ON e.id = p.id;