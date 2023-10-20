"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estudiantesRoutes = void 0;
const express_1 = require("express");
const estudiantesController_1 = require("../controllers/estudiantesController");
class EstudiantesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', estudiantesController_1.estudiantesController.list);
        this.router.get('/:id', estudiantesController_1.estudiantesController.listOne);
        this.router.post('/', estudiantesController_1.estudiantesController.createestudiantes);
        this.router.put('/update/:idEstudiante', estudiantesController_1.estudiantesController.updateestudiantes);
        this.router.delete('/delete/:idEstudiante', estudiantesController_1.estudiantesController.deleteestudiantes);
    }
}
exports.estudiantesRoutes = new EstudiantesRoutes();
exports.default = exports.estudiantesRoutes.router;
