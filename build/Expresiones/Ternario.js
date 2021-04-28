"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = require("../Abstract/Nodo");
const Excepcion_1 = require("../other/Excepcion");
const NodoAST_1 = require("../Abstract/NodoAST");
class Ternario extends Nodo_1.Nodo {
    constructor(operadorTop, operadorMid, operadorBot, line, column) {
        super(null, line, column);
        this.operadorTop = operadorTop;
        this.operadorBot = operadorBot;
        this.operadorMid = operadorMid;
    }
    execute(table, tree) {
        const resultadoTop = this.operadorTop.execute(table, tree);
        if (resultadoTop instanceof Excepcion_1.Excepcion) {
            return resultadoTop;
        }
        const resultadoMid = this.operadorMid.execute(table, tree);
        if (resultadoMid instanceof Excepcion_1.Excepcion) {
            return resultadoMid;
        }
        const resultadoBot = this.operadorBot.execute(table, tree);
        if (resultadoBot instanceof Excepcion_1.Excepcion) {
            return resultadoBot;
        }
        if (resultadoTop) {
            this.tipo = this.operadorMid.tipo;
        }
        else {
            this.tipo = this.operadorBot.tipo;
        }
        return resultadoTop ? resultadoMid : resultadoBot;
    }
    getNodo() {
        var nodo = new NodoAST_1.NodoAST("TERNARIO");
        nodo.agregarHijo(this.operadorBot.getNodo());
        nodo.agregarHijo("?");
        nodo.agregarHijo(this.operadorMid.getNodo());
        nodo.agregarHijo(":");
        nodo.agregarHijo(this.operadorTop.getNodo());
        return nodo;
    }
}
exports.Ternario = Ternario;
