import { Request, Response } from 'express';
import pool from '../database';
import { Router } from 'express';
import { estudiantesController } from '../controllers/estudiantesController';

class EstudiantesRoutes {

    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', estudiantesController.list);
        this.router.get('/:id',estudiantesController.listOne);
        this.router.post('/', estudiantesController.createestudiantes);
        this.router.post('/insertarestudiante/', estudiantesController.insertarestudiante);
        this.router.put('/update/:idEstudiante', estudiantesController.updateestudiantes);
        this.router.delete('/delete/:idEstudiante', estudiantesController.deleteestudiantes)
    }
}
export const estudiantesRoutes = new EstudiantesRoutes();

export default estudiantesRoutes.router;