import {Table} from "../Simbols/Table";
import {Tree} from "../Simbols/Tree";
import {Tipo} from "../other/tipo";
import {tipos} from "../other/tipo";
export abstract class Nodo{
    line: Number;
    column: Number;
    tipo: Tipo;

    abstract execute(table: Table, tree: Tree): any;
 
    constructor(tipo: Tipo, line: Number, column: Number) {
        this.tipo = tipo;
        this.line = line;
        this.column = column;
    }
}