"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = require("../Abstract/Nodo");
const tipo_1 = require("../other/tipo");
const tipo_2 = require("../other/tipo");
const NodoAST_1 = require("../Abstract/NodoAST");
class Print extends Nodo_1.Nodo {
    constructor(expresion, line, column) {
        super(new tipo_1.Tipo(tipo_2.tipos.VOID), line, column);
        this.expresion = expresion;
    }
    execute(table, tree) {
        const valor = this.expresion.execute(table, tree);
        tree.consola.push(valor);
        return null;
    }
    getNodo() {
        var nodo = new NodoAST_1.NodoAST("PRINT");
        nodo.agregarHijo("print");
        nodo.agregarHijo("(");
        nodo.agregarHijo(this.expresion.getNodo());
        nodo.agregarHijo(")");
        return nodo;
    }
}
exports.Print = Print;
