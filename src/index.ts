import express from 'express';
import { Table } from './Simbols/Table';
import { Break } from './Expresiones/Break';
import { Continue } from './Expresiones/Continue';
import { Excepcion } from './other/Excepcion';
import { NodoAST } from './Abstract/NodoAST';
import { Nodo } from './Abstract/Nodo';
import { graphAST } from './Graficar';

const parser = require('./Grammar/Grammar.js');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.set('views', __dirname);
app.use(express.urlencoded());
app.use(express.json());

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
  const tabla = new Table(null);

  tree.instrucciones.map((m: any) => {
    const res = m.execute(tabla, tree);
    if (res instanceof Break) {
      const error = new Excepcion('Semantico',
        `Sentencia break fuera de un ciclo`,
        res.line, res.column);
      tree.excepciones.push(error);
      tree.consola.push(error.toString());
    } else if (res instanceof Continue) {
      const error = new Excepcion('Semantico',
        `Sentencia continue fuera de un ciclo`,
        res.line, res.column);
      tree.excepciones.push(error);
      tree.consola.push(error.toString());
    }
  });

  
  var init:NodoAST = new NodoAST("RAIZ");
  var instr:NodoAST = new NodoAST("INSTRUCCIONES");
  tree.instrucciones.map((m: Nodo) => {
    instr.agregarHijo(m.getNodo());
  });
  init.agregarHijo(instr);
  graphAST(init);

  res.render('views/index', {
    entrada,
    consola: tree.consola,
    errores: tree.excepciones
  });
});

app.listen(port, err => {
  return console.log(`server is listening on ${port}`);
});