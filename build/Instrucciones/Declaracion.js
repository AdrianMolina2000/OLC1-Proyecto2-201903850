"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = require("../Abstract/Nodo");
const Excepcion_1 = require("../other/Excepcion");
const Tipo_1 = require("../other/Tipo");
const Simbolo_1 = require("../Simbols/Simbolo");
const Primitivo_1 = require("../Expresiones/Primitivo");
const NodoAST_1 = require("../Abstract/NodoAST");
function defal(tipo, line, column) {
    if (tipo.tipo == Tipo_1.tipos.ENTERO) {
        return new Primitivo_1.Primitivo(tipo, 0, line, column);
    }
    else if (tipo.tipo == Tipo_1.tipos.DECIMAL) {
        return new Primitivo_1.Primitivo(tipo, 0.0, line, column);
    }
    else if (tipo.tipo == Tipo_1.tipos.BOOLEANO) {
        return new Primitivo_1.Primitivo(tipo, true, line, column);
    }
    else if (tipo.tipo == Tipo_1.tipos.CARACTER) {
        return new Primitivo_1.Primitivo(tipo, '', line, column);
    }
    else if (tipo.tipo == Tipo_1.tipos.STRING) {
        return new Primitivo_1.Primitivo(tipo, "", line, column);
    }
}
exports.defal = defal;
class Declaracion extends Nodo_1.Nodo {
    constructor(tipo, id, valor, line, column) {
        super(tipo, line, column);
        this.id = id;
        this.valor = valor;
    }
    execute(table, tree) {
        const result = this.valor.execute(table, tree);
        if (result instanceof Excepcion_1.Excepcion) {
            return result;
        }
        if (this.valor.tipo.tipo != this.tipo.tipo) {
            if (this.tipo.tipo == Tipo_1.tipos.DECIMAL && (this.valor.tipo.tipo == Tipo_1.tipos.DECIMAL || this.valor.tipo.tipo == Tipo_1.tipos.ENTERO)) {
                this.valor.tipo.tipo = Tipo_1.tipos.DECIMAL;
            }
            else {
                const error = new Excepcion_1.Excepcion('Semantico', `La variable no puede ser declarada debido a que son de diferentes tipos`, this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        }
        let simbolo;
        simbolo = new Simbolo_1.Simbolo(this.tipo, this.id, result, new Tipo_1.Tipo(Tipo_1.tipos.VARIABLE), this.line, this.column);
        const res = table.setVariable(simbolo);
        tree.Variables.push(simbolo);
        // if (res != null) {
        // const error = new Excepcion('Semantico',
        // res,
        // this.line, this.column);
        // tree.excepciones.push(error);
        // tree.consola.push(error.toString());
        // }
        return null;
    }
    getNodo() {
        var nodo = new NodoAST_1.NodoAST("DECLARACION");
        nodo.agregarHijo(this.tipo + "");
        nodo.agregarHijo(this.id);
        if (this.valor != null) {
            nodo.agregarHijo("=");
            nodo.agregarHijo(this.valor.getNodo());
        }
        return nodo;
    }
}
exports.Declaracion = Declaracion;
