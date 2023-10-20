import { Request, Response } from 'express';
//import pool from '../database';
import pool from '../database';
import { Router } from 'express';
import { usuariosController } from '../controllers/usuariosController';
import { validarToken } from '../middleware/auth';

class UsuariosRoutes {

    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/', usuariosController.list);
        this.router.get('/:id',usuariosController.listOne);

        this.router.post('/', usuariosController.createusuarios);
        this.router.put('/update/:idUsuario', usuariosController.updateusuarios);
        this.router.delete('/delete/:idUsuario', usuariosController.deleteusuarios)
        this.router.post('/CambiarPassword',usuariosController.CambiarPassword);

        this.router.post('/verificaUsuario', usuariosController.verificaUsuario);
    }

}
export const usuariosRoutes = new UsuariosRoutes();

export default usuariosRoutes.router;
