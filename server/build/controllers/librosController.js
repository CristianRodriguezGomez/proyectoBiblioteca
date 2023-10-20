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
exports.librosController = void 0;
const database_1 = __importDefault(require("../database"));
class LibrosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const consulta = 'SELECT * FROM libros';
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
            const consulta = 'SELECT * FROM libros WHERE id = ' + id;
            //console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Libro no encontrado' });
        });
    }
    createlibros(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const resp = yield database_1.default.query("INSERT INTO libros set ?", [req.body]);
            res.json(resp);
        });
    }
    insertarlibro(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            let libros = req.body;
            for (var i = 0; i < libros.length; i++) {
                const resp = yield database_1.default.query(`INSERT INTO libros set titulo= '${libros[i].titulo}', autor= '${libros[i].autor}',
                                       disponibles= '${libros[i].disponibles}', editorial= '${libros[i].editorial}',
                                       area= '${libros[i].area}'`);
                res.json(resp);
            }
        });
    }
    updatelibros(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idLibro } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE libros set ? WHERE id = ?", [req.body, idLibro]);
            res.json(resp);
        });
    }
    deletelibros(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idLibro } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM libros WHERE id = ${idLibro}`);
            res.json(resp);
        });
    }
    verificaLibros(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const consulta = `SELECT * FROM libros WHERE titulo="${req.body.titulo}" and cantidad="${req.body.cantidad}"`;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            console.log(respuesta);
            res.json(respuesta);
        });
    }
}
exports.librosController = new LibrosController();
