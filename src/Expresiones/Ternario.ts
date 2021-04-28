import { Nodo } from "../Abstract/Nodo";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Excepcion } from "../other/Excepcion";
import { NodoAST } from "../Abstract/NodoAST";

export class Ternario extends Nodo {
    operadorTop: Nodo;
    operadorMid: Nodo;
    operadorBot: Nodo;
    operador: String;

    constructor(operadorTop: Nodo, operadorMid: Nodo, operadorBot: Nodo, line: Number, column: Number) {
        super(null, line, column);
        this.operadorTop = operadorTop;
        this.operadorBot = operadorBot;
        this.operadorMid = operadorMid;
    }

    execute(table: Table, tree: Tree) {
        const resultadoTop = this.operadorTop.execute(table, tree);
        if (resultadoTop instanceof Excepcion) {
            return resultadoTop;
        }
        const resultadoMid = this.operadorMid.execute(table, tree);
        if (resultadoMid instanceof Excepcion) {
            return resultadoMid;
        }
        const resultadoBot = this.operadorBot.execute(table, tree);
        if (resultadoBot instanceof Excepcion) {
            return resultadoBot;
        }

        if(resultadoTop){
            this.tipo = this.operadorMid.tipo;
        }else{
            this.tipo = this.operadorBot.tipo;
        }
        return resultadoTop ? resultadoMid : resultadoBot; 
    }

    getNodo() {
        var nodo:NodoAST  = new NodoAST("TERNARIO");
        nodo.agregarHijo(this.operadorBot.getNodo());
        nodo.agregarHijo("?");
        nodo.agregarHijo(this.operadorMid.getNodo());
        nodo.agregarHijo(":");
        nodo.agregarHijo(this.operadorTop.getNodo());
        return nodo;
    }
}