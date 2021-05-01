import { Nodo } from "../Abstract/Nodo";
import { NodoAST } from "../Abstract/NodoAST";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";

export class Retorno extends Nodo {
    expresion: Nodo;
    exp: Nodo;
    constructor(expresion: Nodo, line: Number, column: Number) {
        super(null, line, column);
        this.expresion = expresion
    }

    execute(table: Table, tree: Tree) {
        if (this.expresion != null) {
            this.exp = this.expresion.execute(table, tree);
        }
        return this;
    }

    getNodo() {
        var nodo: NodoAST = new NodoAST("RETURN");
        if (this.expresion != null) {
            nodo.agregarHijo(this.expresion.getNodo());
        }

        return nodo;
    }
}