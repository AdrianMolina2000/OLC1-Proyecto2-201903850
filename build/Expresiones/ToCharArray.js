"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = require("../Abstract/Nodo");
const Excepcion_1 = require("../other/Excepcion");
const Tipo_1 = require("../other/Tipo");
const NodoAST_1 = require("../Abstract/NodoAST");
const Primitivo_1 = require("./Primitivo");
class ToCharArray extends Nodo_1.Nodo {
    constructor(expresion, line, column) {
        super(new Tipo_1.Tipo(Tipo_1.tipos.CARACTER), line, column);
        this.expresion = expresion;
    }
    execute(table, tree) {
        try {
            const resultado = this.expresion.execute(table, tree);
            if (resultado instanceof Excepcion_1.Excepcion) {
                return resultado;
            }
            else {
                if (this.expresion.tipo.tipo == Tipo_1.tipos.STRING) {
                    var lista = new Array();
                    var separados = resultado.split("");
                    for (let i = 0; i < separados.length; i++) {
                        lista.push(new Primitivo_1.Primitivo(new Tipo_1.Tipo(Tipo_1.tipos.CARACTER), separados[i], this.line, this.column));
                    }
                    return lista;
                }
                else {
                    const error = new Excepcion_1.Excepcion('Semantico', `No es posible convertir el tipo {${this.expresion.tipo}} a texto`, this.line, this.column);
                    tree.excepciones.push(error);
                    tree.consola.push(error.toString());
                    return error;
                }
            }
        }
        catch (err) {
            const error = new Excepcion_1.Excepcion('Semantico', `Ha ocurrido un error al devolver el Arreglo`, this.line, this.column);
            tree.excepciones.push(error);
            tree.consola.push(error.toString());
            return error;
        }
    }
    getNodo() {
        try {
            var nodo = new NodoAST_1.NodoAST("TOCHARARRAY");
            nodo.agregarHijo("ToCharArray");
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.expresion.getNodo());
            nodo.agregarHijo(")");
            return nodo;
        }
        catch (err) {
            var nodo = new NodoAST_1.NodoAST("ToCharArray");
            return nodo;
        }
    }
}
exports.ToCharArray = ToCharArray;
