"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = require("../Abstract/Nodo");
// Esta clase crea un nodo del tipo primitivo, ya sea int, double, string, char, boolean
class Primitivo extends Nodo_1.Nodo {
    constructor(tipo, valor, line, column) {
        super(tipo, line, column);
        this.valor = valor;
    }
    execute(table, tree) {
        if (typeof (this.valor) === "string") {
            this.valor = this.valor.replace(/\\n/g, "\n");
            this.valor = this.valor.replace(/\\t/g, "\t");
            this.valor = this.valor.replace(/\\\"/g, "\"");
            this.valor = this.valor.replace(/\\\'/g, "\'");
        }
        return this.valor;
    }
}
exports.Primitivo = Primitivo;
