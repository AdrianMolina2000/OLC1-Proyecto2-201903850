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
const NodoAST_1 = require("./Abstract/NodoAST");
const Graficar_1 = require("./Graficar");
const Retorno_1 = require("./Instrucciones/Retorno");
const parser = require('./Grammar/Grammar.js');
const cors = require('cors');
const app = express_1.default();
const port = 3000;
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
    // try {
    const tree = parser.parse(entrada);
    const tabla = new Table_1.Table(null);
    tree.instrucciones.map((m) => {
        // try {
        const res = m.execute(tabla, tree);
        // } catch (error) {
        // const error2 = new Excepcion('Sintactico',
        // `Irrecuperable`, 0, 0);
        // tree.consola.push(error2.toString());
        // }
        if (res instanceof Break_1.Break || res instanceof Retorno_1.Retorno) {
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
    var init = new NodoAST_1.NodoAST("RAIZ");
    var instr = new NodoAST_1.NodoAST("INSTRUCCIONES");
    tree.instrucciones.map((m) => {
        instr.agregarHijo(m.getNodo());
    });
    init.agregarHijo(instr);
    Graficar_1.graphAST(init);
    res.render('views/index', {
        entrada,
        consola: tree.consola,
        errores: tree.excepciones
    });
    // } catch (error) {
    //   let consola2 = new Array<String>();
    //   consola2.push("Ocurrio un Error sintactico Irrecuperable\n\n"); 
    //   consola2.push("                   FFFFFFFFFFFFFFF\n"+
    //                 "                   FFFFFFFFFFFFFFF\n"+
    //                 "                   FFFFFF\n"+
    //                 "                   FFFFFF\n"+
    //                 "                   FFFFFFFFFFFFFFF\n"+
    //                 "                   FFFFFFFFFFFFFFF\n"+
    //                 "                   FFFFFFF\n"+
    //                 "                   FFFFFFF\n"+
    //                 "                   FFFFFFF\n"+
    //                 "                   FFFFFFF");
    //   res.render('views/index', {
    //     entrada,
    //     consola: consola2
    //   });
    // }
});
app.listen(port, err => {
    return console.log(`server is listening on ${port}`);
});
