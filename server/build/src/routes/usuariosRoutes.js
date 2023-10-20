"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosRoutes = void 0;
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usuariosController_1.usuariosController.list);
        this.router.get('/:id', usuariosController_1.usuariosController.listOne);
        this.router.post('/', usuariosController_1.usuariosController.createusuarios);
        this.router.put('/update/:idUsuario', usuariosController_1.usuariosController.updateusuarios);
        this.router.delete('/delete/:idUsuario', usuariosController_1.usuariosController.deleteusuarios);
        this.router.post('/verificaUsuario', usuariosController_1.usuariosController.verificaUsuario);
    }
}
exports.usuariosRoutes = new UsuariosRoutes();
exports.default = exports.usuariosRoutes.router;
