import { Nodo } from "../Abstract/Nodo";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Excepcion } from "../other/Excepcion";
import { tipos, Tipo } from "../other/Tipo";
import { NodoAST } from "../Abstract/NodoAST";
import { Identificador } from "./identificador";
import { Simbolo } from "../Simbols/Simbolo";

export class TypeOf extends Nodo {
    expresion: Nodo;
    constructor(expresion: Nodo, line: Number, column: Number) {
        super(new Tipo(tipos.STRING), line, column);
        this.expresion = expresion;
    }

    execute(table: Table, tree: Tree) {
        try {
            const resultado = this.expresion.execute(table, tree);
            if (resultado instanceof Excepcion) {
                return resultado;
            } else {
                try {
                    let variable: Simbolo;
                    variable = table.getVariable((<Identificador>this.expresion).id);
                    if (variable.tipo2.tipo == tipos.VARIABLE) {
                        return this.expresion.tipo + "";
                    }
                    return variable.tipo2 + "";
                } catch (err) {
                    return this.expresion.tipo + "";
                }
            }
        } catch (err) {
            const error = new Excepcion('Semantico',
                `Ha ocurrido un error al devolver el tipo`,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.consola.push(error.toString());
            return error;
        }
    }

    getNodo() {
        try {
            var nodo: NodoAST = new NodoAST("TYPEOF");
            nodo.agregarHijo("TypeOf");
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.expresion.getNodo());
            nodo.agregarHijo(")");
            return nodo;
        } catch (err) {
            var nodo: NodoAST = new NodoAST("TYPEOF");
            return nodo;
        }
    }

}