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
class DeclaracionArray extends Nodo_1.Nodo {
    constructor(tipo, id, tipo2, num, listaValores, line, column) {
        super(tipo, line, column);
        this.id = id;
        this.tipo2 = tipo2;
        this.num = num;
        this.listaValores = listaValores;
    }
    execute(table, tree) {
        if ((this.tipo2 != null) && (this.num != null) && (this.listaValores == null)) {
            //Declaracion Tipo 1
            if (this.tipo.tipo != this.tipo2.tipo) {
                const error = new Excepcion_1.Excepcion('Semantico', `El vector no puede ser declarado debido a que son de diferentes tipos`, this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
            else {
                var contenido = new Array();
                const result = this.num.execute(table, tree);
                if (result instanceof Excepcion_1.Excepcion) {
                    return result;
                }
                for (let i = 0; i < result; i++) {
                    contenido.push(defal(this.tipo, this.line, this.column));
                }
                let simbolo;
                simbolo = new Simbolo_1.Simbolo(this.tipo, this.id, contenido, new Tipo_1.Tipo(Tipo_1.tipos.ARRAY), this.line, this.column);
                if (table.getVariable(this.id) == null) {
                    table.setVariable(simbolo);
                    tree.Variables.push(simbolo);
                }
                else {
                    const error = new Excepcion_1.Excepcion('Semantico', `El vector ${this.id} no puede ser declarado debido a que ya ha sido declarado anteriormente`, this.line, this.column);
                    tree.excepciones.push(error);
                    tree.consola.push(error.toString());
                    return error;
                }
            }
        }
        else if ((this.tipo2 == null) && (this.num == null) && (this.listaValores != null)) {
            //Declaracion Tipo 2
            var contenido = new Array();
            for (let i = 0; i < this.listaValores.length; i++) {
                this.listaValores[i].execute(table, tree);
                if ((this.tipo.tipo == Tipo_1.tipos.DECIMAL) && (this.listaValores[i].tipo.tipo == Tipo_1.tipos.ENTERO)) {
                    this.listaValores[i].tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                    contenido.push(this.listaValores[i]);
                }
                else if (this.tipo.tipo != this.listaValores[i].tipo.tipo) {
                    const error = new Excepcion_1.Excepcion('Semantico', `El vector no puede ser declarado debido a que son de diferentes tipos`, this.line, this.column);
                    tree.excepciones.push(error);
                    tree.consola.push(error.toString());
                    return error;
                }
                else {
                    contenido.push(this.listaValores[i]);
                }
            }
            let simbolo;
            simbolo = new Simbolo_1.Simbolo(this.tipo, this.id, contenido, new Tipo_1.Tipo(Tipo_1.tipos.ARRAY), this.line, this.column);
            if (table.getVariable(this.id) == null) {
                table.setVariable(simbolo);
                tree.Variables.push(simbolo);
            }
            else {
                const error = new Excepcion_1.Excepcion('Semantico', `El vector ${this.id} no puede ser declarado debido a que ya ha sido declarado anteriormente`, this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        }
        return null;
    }
    getNodo() {
        var nodo = new NodoAST_1.NodoAST("DECLARACION ARRAY");
        if ((this.tipo2 != null) && (this.num != null) && (this.listaValores == null)) {
            nodo.agregarHijo(`${this.tipo}[]`);
            nodo.agregarHijo(this.id + "");
            nodo.agregarHijo("=");
            nodo.agregarHijo("new");
            var nodo2 = new NodoAST_1.NodoAST("Tamaño del Array");
            nodo2.agregarHijo("int");
            nodo2.agregarHijo("[");
            nodo2.agregarHijo(this.num.getNodo());
            nodo2.agregarHijo("]");
            nodo.agregarHijo(nodo2);
        }
        else if ((this.tipo2 == null) && (this.num == null) && (this.listaValores != null)) {
            nodo.agregarHijo(`${this.tipo}[]`);
            nodo.agregarHijo(this.id + "");
            nodo.agregarHijo("=");
            nodo.agregarHijo("{");
            var nodo2 = new NodoAST_1.NodoAST("Lista Valores");
            for (let i = 0; i < this.listaValores.length; i++) {
                nodo2.agregarHijo(this.listaValores[i].getNodo());
            }
            nodo.agregarHijo(nodo2);
            nodo.agregarHijo("}");
        }
        return nodo;
    }
}
exports.DeclaracionArray = DeclaracionArray;
