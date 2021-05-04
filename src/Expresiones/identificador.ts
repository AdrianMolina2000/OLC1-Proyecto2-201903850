import { Nodo } from "../Abstract/Nodo";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Simbolo } from "../Simbols/Simbolo";
import { Excepcion } from "../other/Excepcion";
import { NodoAST } from "../Abstract/NodoAST";

export class Identificador extends Nodo {
    id: String;
    valor: any;

    constructor(id: String, line: Number, column: Number) {
        super(null, line, column);
        this.id = id;
    }

    execute(table: Table, tree: Tree) {
        let variable: Simbolo;
        variable = table.getVariable(this.id);
        if (variable == null) {
            const error = new Excepcion('Semantico',
                `La variable {${this.id}} no ha sido encontrada`,
                this.line, this.column);
            tree.excepciones.push(error);
            return error;
        }
        this.tipo = variable.tipo;
        this.valor = variable.valor;
        return variable.valor;
    }

    getNodo() {
        var nodo:NodoAST  = new NodoAST("IDENTIFICADOR");
        var nodo2:NodoAST  = new NodoAST(this.id + "");
        nodo2.agregarHijo(this.valor + "");
        nodo.agregarHijo(nodo2);
        return nodo;
    }
}
