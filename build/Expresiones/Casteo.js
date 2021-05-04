"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = require("../Abstract/Nodo");
const Excepcion_1 = require("../other/Excepcion");
const Tipo_1 = require("../other/Tipo");
const NodoAST_1 = require("../Abstract/NodoAST");
class Casteo extends Nodo_1.Nodo {
    constructor(tipo, expresion, line, column) {
        super(tipo, line, column);
        this.tipo = tipo;
        this.expresion = expresion;
    }
    execute(table, tree) {
        const resultado = this.expresion.execute(table, tree);
        if (resultado instanceof Excepcion_1.Excepcion) {
            return resultado;
        }
        if (this.expresion.tipo.tipo === Tipo_1.tipos.ENTERO) {
            if (this.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                return resultado;
            }
            else if (this.tipo.tipo === Tipo_1.tipos.STRING) {
                return resultado.toString();
            }
            else if (this.tipo.tipo === Tipo_1.tipos.CARACTER) {
                return String.fromCharCode(resultado);
            }
            else {
                const error = new Excepcion_1.Excepcion('Semantico', `No se puede Castear del tipo ${this.expresion.tipo} a ${this.tipo}`, this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        }
        else if (this.expresion.tipo.tipo === Tipo_1.tipos.DECIMAL) {
            if (this.tipo.tipo === Tipo_1.tipos.ENTERO) {
                return Math.trunc(resultado);
            }
            else if (this.tipo.tipo === Tipo_1.tipos.STRING) {
                return resultado.toString();
            }
            else {
                const error = new Excepcion_1.Excepcion('Semantico', `No se puede Castear del tipo ${this.expresion.tipo} a ${this.tipo}`, this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        }
        else if (this.expresion.tipo.tipo === Tipo_1.tipos.CARACTER) {
            if (this.tipo.tipo === Tipo_1.tipos.ENTERO) {
                return resultado.charCodeAt(0);
            }
            else if (this.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                return resultado.charCodeAt(0);
            }
            else {
                const error = new Excepcion_1.Excepcion('Semantico', `No se puede Castear del tipo ${this.expresion.tipo} a ${this.tipo}`, this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        }
        else {
            const error = new Excepcion_1.Excepcion('Semantico', `No se puede Castear del tipo ${this.expresion.tipo} a ${this.tipo}`, this.line, this.column);
            tree.excepciones.push(error);
            tree.consola.push(error.toString());
            return error;
        }
    }
    getNodo() {
        var nodo = new NodoAST_1.NodoAST("CASTEO");
        nodo.agregarHijo("(");
        nodo.agregarHijo(this.tipo + "");
        nodo.agregarHijo(")");
        nodo.agregarHijo(this.expresion.getNodo());
        return nodo;
    }
}
exports.Casteo = Casteo;
