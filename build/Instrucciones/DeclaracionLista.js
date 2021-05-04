"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = require("../Abstract/Nodo");
const Excepcion_1 = require("../other/Excepcion");
const Tipo_1 = require("../other/Tipo");
const Simbolo_1 = require("../Simbols/Simbolo");
const NodoAST_1 = require("../Abstract/NodoAST");
class DeclaracionLista extends Nodo_1.Nodo {
    constructor(tipo, id, tipo2, line, column) {
        super(tipo, line, column);
        this.id = id;
        this.tipo2 = tipo2;
    }
    execute(table, tree) {
        if (this.tipo.tipo != this.tipo2.tipo) {
            const error = new Excepcion_1.Excepcion('Semantico', `La lista no puede ser declarado debido a que son de diferentes tipos`, this.line, this.column);
            tree.excepciones.push(error);
            tree.consola.push(error.toString());
            return error;
        }
        else {
            var lista = new Array();
            let simbolo;
            simbolo = new Simbolo_1.Simbolo(this.tipo, this.id, lista, new Tipo_1.Tipo(Tipo_1.tipos.LISTA), this.line, this.column);
            if (table.getVariable(this.id) == null) {
                table.setVariable(simbolo);
                tree.Variables.push(simbolo);
            }
            else {
                const error = new Excepcion_1.Excepcion('Semantico', `La lista ${this.id} no puede ser declarada debido a que ya ha sido declarada anteriormente`, this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        }
        return null;
    }
    getNodo() {
        var nodo = new NodoAST_1.NodoAST("DECLARACION LISTA");
        nodo.agregarHijo("List");
        nodo.agregarHijo("<");
        nodo.agregarHijo(`${this.tipo}`);
        nodo.agregarHijo(">");
        nodo.agregarHijo(this.id + "");
        nodo.agregarHijo("=");
        nodo.agregarHijo("new");
        nodo.agregarHijo("list");
        nodo.agregarHijo("<");
        nodo.agregarHijo(`${this.tipo2}`);
        nodo.agregarHijo(">");
        return nodo;
    }
}
exports.DeclaracionLista = DeclaracionLista;
