import { Nodo } from "../Abstract/Nodo"
import { NodoAST } from "../Abstract/NodoAST";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";

export class Case extends Nodo {
    expresion: Nodo;
    instrucciones: Array<Nodo>;

    constructor(expresion: Nodo, instrucciones: Array<Nodo>, line: Number, column: Number) {
        super(null, line, column);
        this.expresion = expresion;
        this.instrucciones = instrucciones;
    }

    execute(table: Table, tree: Tree) {
        return this;
    }

    getNodo() {
        var nodo: NodoAST  = new NodoAST("CASE " + this.expresion.getNodo());
        for (let i = 0; i < this.instrucciones.length; i++) {
            nodo.agregarHijo(this.instrucciones[i].getNodo());
        }
        return nodo;
    }
}