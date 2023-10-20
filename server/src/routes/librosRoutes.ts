import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { librosController } from '../controllers/librosController';

class LibrosRoutes
{

    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/',librosController.list);
        this.router.get('/:id',librosController.listOne);
        this.router.post('/',librosController.createlibros);
        this.router.post('/insertarlibro/',librosController.insertarlibro);
        this.router.put('/update/:idLibro',librosController.updatelibros);
        this.router.delete('/delete/:idLibro',librosController.deletelibros)



    }
}
export const librosRoutes = new LibrosRoutes();

export default librosRoutes.router;