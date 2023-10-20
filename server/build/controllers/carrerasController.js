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
exports.carrerasController = void 0;
const database_1 = __importDefault(require("../database"));
class CarrerasController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const consulta = 'SELECT * FROM carreras';
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
            const consulta = 'SELECT * FROM carreras WHERE id = ' + id;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'carrera no encontrada' });
        });
    }
    createcarreras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const resp = yield database_1.default.query("INSERT INTO carreras set ?", [req.body]);
            res.json(resp);
        });
    }
    insertacarrera(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            let carreras = req.body;
            for (var i = 0; i < carreras.length; i++) {
                const resp = yield database_1.default.query(`INSERT INTO carreras set area= '${carreras[i].area}'`);
                res.json(resp);
            }
        });
    }
    updatecarreras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCarrera } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE carreras set ? WHERE id = ?", [req.body, idCarrera]);
            res.json(resp);
        });
    }
    deletecarreras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idCarrera } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM carreras WHERE id = ${idCarrera}`);
            res.json(resp);
        });
    }
}
exports.carrerasController = new CarrerasController();
