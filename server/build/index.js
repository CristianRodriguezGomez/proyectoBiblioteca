"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //libreria
const indexRoutes_1 = __importDefault(require("./indexRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const estudiantesRoutes_1 = __importDefault(require("./routes/estudiantesRoutes"));
const librosRoutes_1 = __importDefault(require("./routes/librosRoutes"));
const prestamosRoutes_1 = __importDefault(require("./routes/prestamosRoutes"));
const carrerasRoutes_1 = __importDefault(require("./routes/carrerasRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
const fs_1 = __importDefault(require("fs")); //libreria para guardar archivos
class Server //clase
 {
    constructor() {
        this.app = (0, express_1.default)(); //ejecutar servidor
        this.config();
        this.routes();
        this.app.use('/documentacion', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
        this.app.use(express_1.default.static(__dirname + "/img"));
    }
    config() {
        this.app.set('port', process.env.PORT || 3002);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/usuarios', usuariosRoutes_1.default);
        this.app.use('/api/estudiantes', estudiantesRoutes_1.default);
        this.app.use('/api/libros', librosRoutes_1.default);
        this.app.use('/api/prestamos', prestamosRoutes_1.default);
        this.app.use('/api/carreras', carrerasRoutes_1.default);
        this.app.post('/uploadImagen', (req, res) => {
            const file = req.body.src;
            const carpeta = req.body.carpeta;
            const name = req.body.id;
            console.log(file, carpeta, name);
            const binaryData = Buffer.from(file.replace(/^data:image\/[a-z]+;base64,/, ""), 'base64').toString('binary');
            fs_1.default.writeFile(`${__dirname}/img/` + carpeta + '/' + name + '.jpg', binaryData, "binary", (err) => {
                console.log(err);
            });
            res.json({ fileName: name + '.jpg' });
        });
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor se encuentra en el puerto: ', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
