"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Table_1 = require("./Simbols/Table");
const Break_1 = require("./Expresiones/Break");
const Continue_1 = require("./Expresiones/Continue");
const Excepcion_1 = require("./other/Excepcion");
const parser = require('./Grammar/Grammar.js');
const cors = require('cors');
const app = express_1.default();
const port = 4003;
app.use(cors());
app.use(express_1.default.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname);
app.use(express_1.default.urlencoded());
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.render('views/index', {
        entrada: '',
        consola: [],
        errores: []
    });
}).get('/analizar', (req, res) => {
    res.render('views/index', {
        entrada: '',
        consola: [],
        errores: []
    });
});
app.post('/analizar', (req, res) => {
    const { entrada, consola } = req.body;
    if (!entrada) {
        return res.redirect('/');
    }
    const tree = parser.parse(entrada);
    const tabla = new Table_1.Table(null);
    tree.instrucciones.map((m) => {
        const res = m.execute(tabla, tree);
        if (res instanceof Break_1.Break) {
            const error = new Excepcion_1.Excepcion('Semantico', `Sentencia break fuera de un ciclo`, res.line, res.column);
            tree.excepciones.push(error);
            tree.consola.push(error.toString());
        }
        else if (res instanceof Continue_1.Continue) {
            const error = new Excepcion_1.Excepcion('Semantico', `Sentencia continue fuera de un ciclo`, res.line, res.column);
            tree.excepciones.push(error);
            tree.consola.push(error.toString());
        }
    });
    res.render('views/index', {
        entrada,
        consola: tree.consola,
        errores: tree.excepciones
    });
});
app.listen(port, err => {
    return console.log(`server is listening on ${port}`);
});
