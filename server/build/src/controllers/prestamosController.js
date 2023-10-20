"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prestamosController = void 0;
const database_1 = __importDefault(require("../database"));
class PrestamosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const consulta = `SELECT * FROM prestamos`;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            console.log(respuesta);
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const { id } = req.params;
            const consulta = 'SELECT * FROM prestamos WHERE id = ' + id;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Prestamo no encontrado' });
        });
    }
    createprestamos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            console.log(req.body['id_libro']);
            const { id, id_libro } = req.body;
            console.log(id_libro);
            const resp = yield database_1.default.query("INSERT INTO prestamos SET ?", [req.body]);
            const resp2 = yield database_1.default.query(`UPDATE libros SET disponibles = disponibles-1 WHERE id= ${id_libro}`);
            res.json(resp);
        });
    }
    updateprestamos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPrestamo } = req.params;
            console.log(req.params);
            const { id, id_libro } = req.body;
            console.log(id_libro);
            const resp = yield database_1.default.query("UPDATE prestamos set ? WHERE id = ?", [req.body, idPrestamo]);
            const resp2 = yield database_1.default.query(`UPDATE libros SET disponibles = disponibles+1 WHERE id= ${id_libro}`);
            res.json(resp);
        });
    }
    deleteprestamos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idPrestamo } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM prestamos WHERE id = ${idPrestamo}`);
            res.json(resp);
        });
    }
    verificaPrestamo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const consulta = `SELECT * FROM prestamos WHERE id_estudiante="${req.body.id_estudiante}" and id_libro="${req.body.id_libro}"`;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            console.log(respuesta);
            res.json(respuesta);
        });
    }
}
exports.prestamosController = new PrestamosController();
//SELECT libros.id, libros.titulo,libros.cantidad FROM libros INNER JOIN prestamos ON libros.id = prestamos.id`
//SELECT  l.id, e.nombre, l.titulo, p.cantidadLibros, p.fechaPrestamo, p.horaPrestamo, p.fechaDevolucion, p.observacion FROM prestamos AS p JOIN libros AS l ON l.id = p.id RIGHT JOIN estudiantes AS e ON e.id = p.id;
//SELECT  l.id, e.id, l.titulo, p.cantidadLibros, p.fechaPrestamo, p.horaPrestamo, p.fechaDevolucion, p.observacion FROM prestamos AS p JOIN libros AS l ON l.id = p.id RIGHT JOIN estudiantes AS e ON e.id = p.id;
