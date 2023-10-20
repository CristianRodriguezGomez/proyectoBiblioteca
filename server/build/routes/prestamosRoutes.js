"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prestamosRoutes = void 0;
const express_1 = require("express");
const prestamosController_1 = require("../controllers/prestamosController");
class PrestamosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', prestamosController_1.prestamosController.list);
        this.router.get('/:id', prestamosController_1.prestamosController.listOne);
        this.router.post('/', prestamosController_1.prestamosController.createprestamos);
        this.router.put('/update/:idPrestamo', prestamosController_1.prestamosController.updateprestamos);
        this.router.delete('/delete/:idPrestamo', prestamosController_1.prestamosController.deleteprestamos);
    }
}
exports.prestamosRoutes = new PrestamosRoutes();
exports.default = exports.prestamosRoutes.router;
