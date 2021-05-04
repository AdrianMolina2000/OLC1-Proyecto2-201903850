import { Nodo } from "../Abstract/Nodo"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Excepcion } from "../other/Excepcion";
import { Tipo, tipos } from "../other/Tipo";
import { Simbolo } from "../Simbols/Simbolo";
import { NodoAST } from "../Abstract/NodoAST";


export class DeclaracionLista extends Nodo {
    tipo: Tipo;
    id: String;
    tipo2: Tipo;

    constructor(tipo: Tipo, id: String, tipo2: Tipo, line: Number, column: Number) {
        super(tipo, line, column);
        this.id = id;
        this.tipo2 = tipo2;
    }

    execute(table: Table, tree: Tree) {
        if (this.tipo.tipo != this.tipo2.tipo) {
            const error = new Excepcion('Semantico',
                `La lista no puede ser declarado debido a que son de diferentes tipos`,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.consola.push(error.toString());
            return error;
        } else {
            var lista: Array<Nodo> = new Array<Nodo>();
            let simbolo: Simbolo;
            simbolo = new Simbolo(this.tipo, this.id, lista, new Tipo(tipos.LISTA), this.line, this.column);

            if (table.getVariable(this.id) == null) {
                table.setVariable(simbolo);
                tree.Variables.push(simbolo)
            } else {
                const error = new Excepcion('Semantico',
                    `La lista ${this.id} no puede ser declarada debido a que ya ha sido declarada anteriormente`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        }
        return null;
    }

    getNodo() {

        var nodo: NodoAST = new NodoAST("DECLARACION LISTA");
        nodo.agregarHijo("List");
        nodo.agregarHijo("<");
        nodo.agregarHijo(`${this.tipo}`);
        nodo.agregarHijo(">");
        nodo.agregarHijo(this.id + "");
        nodo.agregarHijo("=");
        nodo.agregarHijo("new");
        nodo.agregarHijo("list");
        nodo.agregarHijo("<");
        nodo.agregarHijo(`${this.tipo2}`)
        nodo.agregarHijo(">");
        return nodo;
    }
}