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
exports.usuariosController = void 0;
const database_1 = __importDefault(require("../database"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UsuariosController {
    //CRUD
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const consulta = `SELECT * FROM usuarios `;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            console.log(respuesta);
            res.json(respuesta);
        });
    }
    createusuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            let pass = req.body.password;
            console.log(pass);
            const salt = yield bcryptjs_1.default.genSalt(10);
            req.body.password = yield bcryptjs_1.default.hash(req.body.password, salt);
            console.log(req.body.password);
            let prueba = yield bcryptjs_1.default.compare("a", req.body.password);
            console.log(prueba);
            const resp = yield database_1.default.query("INSERT INTO usuarios set ?", [req.body]);
            res.json(resp);
        });
    }
    updateusuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            console.log(req.params);
            const resp = yield database_1.default.query("UPDATE usuarios set ? WHERE id = ?", [req.body, idUsuario]);
            res.json(resp);
        });
    }
    deleteusuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUsuario } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM usuarios WHERE id = ${idUsuario}`);
            res.json(resp);
        });
    }
    //SERVICIOS
    verificaUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const consulta = `SELECT usuarios.rol FROM usuarios WHERE email="${req.body.email}" AND password="${req.body.password}"`;
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length == 0) {
                res.json(null);
            }
            else {
                res.json(respuesta);
            }
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params);
            const { id } = req.params;
            const consulta = 'SELECT * FROM usuarios WHERE id = ' + id;
            console.log(consulta);
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Materia no encontrado' });
        });
    }
    generaToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo } = req.params;
            let consulta = "SELECT * FROM profesores WHERE correo = '" + correo + "'";
            const respuesta = yield database_1.default.query(consulta);
            if (respuesta.length > 0) {
                const token = jsonwebtoken_1.default.sign(correo, process.env.TOKEN_SECRET || 'prueba');
                res.json({ "idProfesor": respuesta[0].idProfesor, "token": token });
            }
            else
                res.json({ "idProfesor": -1, "token": "" });
        });
    }
}
exports.usuariosController = new UsuariosController();
