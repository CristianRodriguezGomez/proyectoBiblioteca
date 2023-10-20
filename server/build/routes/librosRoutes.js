"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.librosRoutes = void 0;
const express_1 = require("express");
const librosController_1 = require("../controllers/librosController");
class LibrosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', librosController_1.librosController.list);
        this.router.get('/:id', librosController_1.librosController.listOne);
        this.router.post('/', librosController_1.librosController.createlibros);
        this.router.post('/insertarlibro/', librosController_1.librosController.insertarlibro);
        this.router.put('/update/:idLibro', librosController_1.librosController.updatelibros);
        this.router.delete('/delete/:idLibro', librosController_1.librosController.deletelibros);
    }
}
exports.librosRoutes = new LibrosRoutes();
exports.default = exports.librosRoutes.router;
