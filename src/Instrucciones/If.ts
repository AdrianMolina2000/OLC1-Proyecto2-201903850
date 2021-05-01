import { Nodo } from "../Abstract/Nodo"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Excepcion } from "../other/Excepcion";
import { tipos } from "../other/Tipo";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { NodoAST } from "../Abstract/NodoAST";
import { Retorno } from "./Retorno";

export class If extends Nodo {
    condicion: Nodo;
    listaIf: Array<Nodo>;
    listaElse: Array<Nodo>;

    constructor(condicion: Nodo, listaIf: Array<Nodo>, listaElse: Array<Nodo>, line: Number, column: Number) {
        super(null, line, column);
        this.condicion = condicion;
        this.listaIf = listaIf;
        this.listaElse = listaElse;
    }

    execute(table: Table, tree: Tree) {
        const newtable = new Table(table);
        let result: Nodo;
        result = this.condicion.execute(newtable, tree);
        if (result instanceof Excepcion) {
            return result;
        }

        if (this.condicion.tipo.tipo !== tipos.BOOLEANO) {
            const error = new Excepcion('Semantico',
                `Se esperaba una expresion BOOLEANA para la condicion`,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.consola.push(error.toString());
            return error;
        }

        if (result) {
            for (let i = 0; i < this.listaIf.length; i++) {
                const res = this.listaIf[i].execute(newtable, tree);
                if (res instanceof Continue || res instanceof Break || res instanceof Retorno) {
                    return res;
                }
            }
        } else {
            for (let i = 0; i < this.listaElse.length; i++) {
                const res = this.listaElse[i].execute(newtable, tree);
                if (res instanceof Continue || res instanceof Break || res instanceof Retorno) {
                    return res;
                }
            }
        }

        return null;
    }

    getNodo() {
        var nodo: NodoAST = new NodoAST("IF");
        nodo.agregarHijo("if");
        nodo.agregarHijo("(");
        nodo.agregarHijo(this.condicion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        var nodo2: NodoAST = new NodoAST("INSTRUCCIONES IF");
        for (let i = 0; i < this.listaIf.length; i++) {
            nodo2.agregarHijo(this.listaIf[i].getNodo());
        }
        nodo.agregarHijo(nodo2);
        nodo.agregarHijo("}");
        if (this.listaElse != null) { // ELSE
            nodo.agregarHijo("else");
            nodo.agregarHijo("{");
            var nodo3: NodoAST = new NodoAST("INSTRUCCIONES ELSE");
            for (let i = 0; i < this.listaElse.length; i++) {
                nodo3.agregarHijo(this.listaElse[i].getNodo());
            }
            nodo.agregarHijo(nodo3);
            nodo.agregarHijo("}");
        }
        return nodo;
    }
}