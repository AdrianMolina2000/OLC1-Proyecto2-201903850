import { Nodo } from "../Abstract/Nodo"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Excepcion } from "../other/Excepcion";
import { tipos } from "../other/Tipo";
import { Continue } from "../Expresiones/Continue";
import { Break } from "../Expresiones/Break";
import { NodoAST } from "../Abstract/NodoAST";
import { Relacional } from "../Expresiones/Relacional";
import { Case } from "./Case";

export class Switch extends Nodo {
    expresion: Nodo;
    listaCasos: Array<Nodo>;
    defal: Array<Nodo>;

    constructor(expresion: Nodo, listaCasos: Array<Nodo>, defal: Array<Nodo>, line: Number, column: Number) {
        super(null, line, column);
        this.expresion = expresion;
        this.listaCasos = listaCasos;
        this.defal = defal;
    }

    execute(table: Table, tree: Tree): any {
        const newtable = new Table(table);
        var ejecutado = false;

        if (this.listaCasos != null) {
            for (let caso of this.listaCasos) {
                var caso2: Case = caso.execute(newtable, tree);

                var condicion = new Relacional(this.expresion, caso2.expresion, '==', this.line, this.column);
                if (condicion.tipo.tipo == tipos.BOOLEANO) {
                    if (condicion.execute(newtable, tree) || !ejecutado) {

                        for (let i = 0; i < caso2.instrucciones.length; i++) {
                            const res = caso2.instrucciones[i].execute(newtable, tree);
                            if (res instanceof Break) {
                                return null;
                            }
                        }
                    }
                }
            }
        }

        if (this.defal && !ejecutado) {
            for (let def of this.defal) {
                const res = def.execute(newtable, tree);
                if (res instanceof Break) {
                    return null;
                }
            }
        }

        return null;
    }

    getNodo() {
        var nodo: NodoAST = new NodoAST("SWITCH");
        nodo.agregarHijo("switch");
        nodo.agregarHijo("(");
        nodo.agregarHijo(this.expresion.getNodo());
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        if(this.listaCasos != null){
            var nodo2: NodoAST = new NodoAST("Casos");
            for (let i = 0; i < this.listaCasos.length; i++) {
                nodo2.agregarHijo(this.listaCasos[i].getNodo());
            }
            nodo.agregarHijo(nodo2);
        }
        if(this.defal != null){
            var nodo3: NodoAST = new NodoAST("Default");

            for (let i = 0; i < this.defal.length; i++) {
                nodo3.agregarHijo(this.defal[i].getNodo());
            }
            nodo.agregarHijo(nodo3);
        }
        nodo.agregarHijo("}");
        return nodo;
    }
}