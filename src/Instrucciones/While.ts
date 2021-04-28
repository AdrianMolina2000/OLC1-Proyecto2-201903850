import { Nodo } from "../Abstract/Nodo"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Excepcion } from "../other/Excepcion";
import { tipos } from "../other/Tipo";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { NodoAST } from "../Abstract/NodoAST";

export class While extends Nodo {
    condicion: Nodo;
    List: Array<Nodo>;

    constructor(condicion: Nodo, List: Array<Nodo>, line: Number, column: Number) {
        super(null, line, column);
        this.condicion = condicion;
        this.List = List;
    }

    execute(table: Table, tree: Tree) {
        const newtable = new Table(table);
        let result: Nodo;
        do {
            result = this.condicion.execute(newtable, tree);
            if (result instanceof Excepcion) {
                return result;
            }

            if (this.condicion.tipo.tipo !== tipos.BOOLEANO) {
                const error = new Excepcion('Semantico',
                    `Se esperaba una expresion booleana para la condicion`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
            if (result) {
                for (let i = 0; i < this.List.length; i++) {
                    const res = this.List[i].execute(newtable, tree);
                    if (res instanceof Continue) {
                        break;
                    } else if (res instanceof Break) {
                        return;
                    }
                }
            }
        } while (result);
        return null;
    }

    getNodo() {
        var nodo:NodoAST  = new NodoAST("WHILE");
        nodo.agregarHijo("while");
        nodo.agregarHijo("(");
        nodo.agregarHijo(this.condicion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        var nodo2:NodoAST  = new NodoAST("INSTRUCCIONES");

        for(let i = 0; i<this.List.length; i++){
            nodo2.agregarHijo(this.List[i].getNodo());
        }
        nodo.agregarHijo(nodo2);
        nodo.agregarHijo("}");
        return nodo;
    }
}