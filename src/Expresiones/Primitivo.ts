import {Nodo} from "../Abstract/Nodo";
import {Table} from "../Simbols/Table";
import {Tree} from "../Simbols/Tree";
import {Tipo} from "../other/tipo";
import {tipos} from "../other/tipo";


// Esta clase crea un nodo del tipo primitivo, ya sea int, double, string, char, boolean

export class Primitivo extends Nodo{
    valor: Object;

    constructor(tipo:Tipo, valor: Object, line: Number, column: Number){
        super(tipo, line, column);
        this.valor = valor;
    }

    execute(table: Table, tree: Tree) {
        return this.valor;
    }
}