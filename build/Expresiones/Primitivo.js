"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = require("../Abstract/Nodo");
const NodoAST_1 = require("../Abstract/NodoAST");
// Esta clase crea un nodo del tipo primitivo, ya sea int, double, string, char, boolean
class Primitivo extends Nodo_1.Nodo {
    constructor(tipo, valor, line, column) {
        super(tipo, line, column);
        this.valor = valor;
    }
    execute(table, tree) {
        return this.valor;
    }
    getNodo() {
        var nodo = new NodoAST_1.NodoAST("PRIMITIVO");
        nodo.agregarHijo(this.valor + '');
        return nodo;
    }
}
exports.Primitivo = Primitivo;
