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
exports.estudiantesController = void 0;
const database_1 = __importDefault(require("../database"));
class EstudiantesController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const consulta = 'SELECT * FROM estudiantes';
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
            const consulta = 'SELECT * FROM estudiantes WHERE id = ' + id;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Estudiante no encontrado' });
        });
    }
    createestudiantes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const resp = yield database_1.default.query("INSERT INTO estudiantes set ?", [req.body]);
            res.json(resp);
        });
    }
    insertarestudiante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            let estudiantes = req.body;
            for (var i = 0; i < estudiantes.length; i++) {
                const resp = yield database_1.default.query(`INSERT INTO estudiantes set nombre= '${estudiantes[i].nombre}', idCarrera= '${estudiantes[i].idCarrera}',
                                       correo= '${estudiantes[i].correo}', telefono= '${estudiantes[i].telefono}',
                                       direccion= '${estudiantes[i].direccion}'`);
                res.json(resp);
            }
        });
    }
    updateestudiantes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idEstudiante } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE estudiantes set ? WHERE id = ?", [req.body, idEstudiante]);
            res.json(resp);
        });
    }
    deleteestudiantes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idEstudiante } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM estudiantes WHERE id = ${idEstudiante}`);
            res.json(resp);
        });
    }
    verificaEstudiante(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const consulta = `SELECT * FROM estudiantes WHERE nombre="${req.body.nombre}" and carrera="${req.body.carrera}"`;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            console.log(respuesta);
            res.json(respuesta);
        });
    }
}
exports.estudiantesController = new EstudiantesController();
