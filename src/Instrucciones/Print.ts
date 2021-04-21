import {Nodo} from "../Abstract/Nodo";
import {Table} from "../Simbols/Table";
import {Tree} from "../Simbols/Tree";
import {Tipo} from "../other/tipo";
import {tipos} from "../other/tipo";



export class Print extends Nodo{
    expresion : Nodo;

    constructor(expresion: Nodo, line: Number, column: Number){
        super(new Tipo(tipos.VOID), line, column);
        this.expresion = expresion;
    }

    execute(table: Table, tree: Tree): any {
        const valor = this.expresion.execute(table, tree);
        tree.consola.push(valor);
        return null;
    }
}