"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = require("../Abstract/Nodo");
const Excepcion_1 = require("../other/Excepcion");
const Tipo_1 = require("../other/Tipo");
const Simbolo_1 = require("../Simbols/Simbolo");
const NodoAST_1 = require("../Abstract/NodoAST");
class DeclaracionMetodo extends Nodo_1.Nodo {
    constructor(tipo, id, listaParams, instrucciones, line, column) {
        super(tipo, line, column);
        this.id = id;
        this.listaParams = listaParams;
        this.instrucciones = instrucciones;
    }
    execute(table, tree) {
        // var nombre = this.id + "$";
        var nombre = this.id + "$";
        var index = 0;
        for (let param of this.listaParams) {
            // nombre += param.tipo;
            index += 1;
        }
        nombre += index + "";
        if (table.getVariable(nombre) == null) {
            var tipo2 = new Tipo_1.Tipo(Tipo_1.tipos.FUNCION);
            if (this.tipo.tipo == Tipo_1.tipos.VOID) {
                tipo2 = new Tipo_1.Tipo(Tipo_1.tipos.METODO);
            }
            var metodo = new Simbolo_1.Simbolo(this.tipo, nombre, [this.listaParams, this.instrucciones], tipo2, this.line, this.column);
            table.setVariable(metodo);
            tree.Variables.push(metodo);
        }
        else {
            const error = new Excepcion_1.Excepcion('Semantico', `El metodo {${nombre.split("$", 1)[0]}} ya ha sido creado con anterioridad `, this.line, this.column);
            tree.excepciones.push(error);
            tree.consola.push(error.toString());
            return error;
        }
    }
    getNodo() {
        var nodo = new NodoAST_1.NodoAST("DECLARACION METODO");
        if (this.tipo.tipo == Tipo_1.tipos.VOID) {
            nodo.agregarHijo("Void");
        }
        else {
            nodo.agregarHijo(this.tipo + "");
        }
        nodo.agregarHijo(this.id);
        nodo.agregarHijo("(");
        if (this.listaParams.length != 0) {
            var nodo2 = new NodoAST_1.NodoAST("Parametros");
            var index = 1;
            for (let i = 0; i < this.listaParams.length; i++) {
                var param = this.listaParams[i];
                var nodo3 = new NodoAST_1.NodoAST(param.tipo + "");
                nodo3.agregarHijo(param.id + "");
                nodo2.agregarHijo(nodo3);
            }
            nodo.agregarHijo(nodo2);
        }
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        var nodo3 = new NodoAST_1.NodoAST("INSTRUCCIONES");
        for (let i = 0; i < this.instrucciones.length; i++) {
            nodo3.agregarHijo(this.instrucciones[i].getNodo());
        }
        nodo.agregarHijo(nodo3);
        nodo.agregarHijo("}");
        return nodo;
    }
}
exports.DeclaracionMetodo = DeclaracionMetodo;
