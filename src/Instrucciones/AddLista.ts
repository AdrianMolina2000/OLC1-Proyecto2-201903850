import { Nodo } from "../Abstract/Nodo";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Excepcion } from "../other/Excepcion";
import { Simbolo } from "../Simbols/Simbolo";
import { Tipo, tipos } from "../other/Tipo";
import { NodoAST } from "../Abstract/NodoAST";


export class AddLista extends Nodo {
    id: String;
    expresion: Nodo;
    dar:any;
    constructor(id: String, expresion: Nodo, line: Number, column: Number) {
        super(null, line, column);
        this.id = id;
        this.expresion = expresion;
    }

    execute(table: Table, tree: Tree) {
        const result = this.expresion.execute(table, tree);
        if (result instanceof Excepcion) {
            return result;
        }
        this.dar = result;

        let variable: Simbolo;
        variable = table.getVariable(this.id);
        if (variable == null) {
            const error = new Excepcion('Semantico',
                `La Lista {${this.id}} no ha sido encontrada`,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.consola.push(error.toString());
            return error;
        }

        var arreglo: Array<Nodo> = <Array<Nodo>>variable.valor;


        if (variable.tipo.tipo != this.expresion.tipo.tipo) {
            if ((variable.tipo.tipo == tipos.DECIMAL) && (this.expresion.tipo.tipo == tipos.ENTERO)) {
                this.expresion.tipo.tipo = tipos.DECIMAL;
                arreglo.push(this.expresion);
                variable.valor = arreglo;
                return null;
            } else {
                const error = new Excepcion('Semantico',
                    `No se puede ingresar un valor de diferente tipo al de la lista {${this.id}}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        } else {
            if (variable.tipo2.tipo == tipos.LISTA) {
                arreglo.push(this.expresion);
                variable.valor = arreglo;
                return null;
            } else {
                const error = new Excepcion('Semantico',
                    `No se puede agregar un valor al vector {${this.id}}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        }
    }

    getNodo() {
        var nodo: NodoAST = new NodoAST("ADD");
        nodo.agregarHijo(this.id + "");
        nodo.agregarHijo(".add");
        nodo.agregarHijo("(");
        nodo.agregarHijo(this.expresion.getNodo());
        nodo.agregarHijo(")");
        return nodo;
    }
}