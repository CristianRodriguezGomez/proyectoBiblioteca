import {Request,Response} from 'express';
import pool from '../database';
import { Router } from 'express';
import { carrerasController } from '../controllers/carrerasController';
class CarrerasRoutes
{

    public router: Router=Router();
    constructor()
    {
        this.config();
    }
    config() : void
    {
        this.router.get('/',carrerasController.list);
        this.router.get('/:id',carrerasController.listOne);
        this.router.post('/insertacarrera/',carrerasController.insertacarrera)
        this.router.post('/',carrerasController.createcarreras);
        this.router.put('/update/:idCarrera',carrerasController.updatecarreras);
        this.router.delete('/delete/:idCarrera', carrerasController.deletecarreras)


    }
}
export const carrerasRoutes = new CarrerasRoutes();

export default carrerasRoutes.router;