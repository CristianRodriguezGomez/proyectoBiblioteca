"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carrerasRoutes = void 0;
const express_1 = require("express");
const carrerasController_1 = require("../controllers/carrerasController");
class CarrerasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', carrerasController_1.carrerasController.list);
        this.router.get('/:id', carrerasController_1.carrerasController.listOne);
        this.router.post('/', carrerasController_1.carrerasController.createcarreras);
        this.router.put('/update/:idCarrera', carrerasController_1.carrerasController.updatecarreras);
        this.router.delete('/delete/:idCarrera', carrerasController_1.carrerasController.deletecarreras);
    }
}
exports.carrerasRoutes = new CarrerasRoutes();
exports.default = exports.carrerasRoutes.router;
