import { Nodo } from "../Abstract/Nodo";
import { NodoAST } from "../Abstract/NodoAST";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";

export class Continue extends Nodo {
    constructor(line: Number, column: Number) {
        super(null, line, column);
    }

    execute(table: Table, tree: Tree){
        return this;
    }

    getNodo() {
        var nodo: NodoAST  = new NodoAST("CONTINUE");
        return nodo;
    }
}