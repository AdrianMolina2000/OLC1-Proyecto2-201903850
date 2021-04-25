import { Nodo } from "../Abstract/Nodo";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Excepcion } from "../other/Excepcion";
import { tipos, Tipo } from "../other/Tipo";

export class Casteo extends Nodo {
    tipo: Tipo;
    expresion: Nodo;

    constructor(tipo: Tipo, expresion: Nodo, line: Number, column: Number) {
        super(tipo, line, column);
        this.tipo = tipo;
        this.expresion = expresion;
    }

    execute(table: Table, tree: Tree) {
        const resultado = this.expresion.execute(table, tree);
        if (resultado instanceof Excepcion) {
            return resultado;
        }

        if (this.expresion.tipo.tipo === tipos.ENTERO) {
            if (this.tipo.tipo === tipos.DECIMAL) {
                return resultado;
            } else if (this.tipo.tipo === tipos.STRING) {
                return resultado.toString();
            } else if (this.tipo.tipo === tipos.CARACTER) {
                return String.fromCharCode(resultado);
            } else {
                const error = new Excepcion('Semantico',
                    `No se puede Castear del tipo ${this.expresion.tipo} a ${this.tipo}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        } else if (this.expresion.tipo.tipo === tipos.DECIMAL) {
            if (this.tipo.tipo === tipos.ENTERO) {
                return Math.trunc(resultado);
            } else if (this.tipo.tipo === tipos.STRING) {
                return resultado.toString();
            } else {
                const error = new Excepcion('Semantico',
                    `No se puede Castear del tipo ${this.expresion.tipo} a ${this.tipo}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        } else if (this.expresion.tipo.tipo === tipos.CARACTER) {
            if (this.tipo.tipo === tipos.ENTERO) {
                return resultado.charCodeAt(0);
            } else if (this.tipo.tipo === tipos.DECIMAL) {
                return resultado.charCodeAt(0);
            } else {
                const error = new Excepcion('Semantico',
                    `No se puede Castear del tipo ${this.expresion.tipo} a ${this.tipo}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        } else {
            const error = new Excepcion('Semantico',
                `No se puede Castear del tipo ${this.expresion.tipo} a ${this.tipo}`,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.consola.push(error.toString());
            return error;
        }
    }
}