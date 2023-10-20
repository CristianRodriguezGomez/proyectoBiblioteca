import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { prestamosController } from '../controllers/prestamosController';

class PrestamosRoutes {

    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', prestamosController.list);
        this.router.get('/:id',prestamosController.listOne);

        this.router.post('/', prestamosController.createprestamos);
        this.router.put('/update/:idPrestamo', prestamosController.updateprestamos);
        this.router.delete('/delete/:idPrestamo', prestamosController.deleteprestamos);
    }

}
export const prestamosRoutes = new PrestamosRoutes();

export default prestamosRoutes.router;