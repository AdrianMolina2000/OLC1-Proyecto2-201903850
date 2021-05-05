import { Nodo } from "../Abstract/Nodo";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Excepcion } from "../other/Excepcion";
import { tipos, Tipo } from "../other/Tipo";
import { NodoAST } from "../Abstract/NodoAST";
import { Primitivo } from "./Primitivo";

export class ToCharArray extends Nodo {
    expresion: Nodo;
    constructor(expresion: Nodo, line: Number, column: Number) {
        super(new Tipo(tipos.CARACTER), line, column);
        this.expresion = expresion;
    }

    execute(table: Table, tree: Tree) {
        try {
            const resultado = this.expresion.execute(table, tree);
            if (resultado instanceof Excepcion) {
                return resultado;
            } else {
                if (this.expresion.tipo.tipo == tipos.STRING) {
                    var lista:Array<Nodo> = new Array<Nodo>();
                    var separados:Array<String> = resultado.split("");
                    for(let i = 0; i<separados.length; i++){
                        lista.push(new Primitivo(new Tipo(tipos.CARACTER), separados[i], this.line, this.column))
                    }
                    return lista;
                } else {
                    const error = new Excepcion('Semantico',
                        `No es posible convertir el tipo {${this.expresion.tipo}} a texto`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    tree.consola.push(error.toString());
                    return error;
                }
            }
        } catch (err) {
            const error = new Excepcion('Semantico',
                `Ha ocurrido un error al devolver el Arreglo`,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.consola.push(error.toString());
            return error;
        }
    }

    getNodo() {
        try {
            var nodo: NodoAST = new NodoAST("TOCHARARRAY");
            nodo.agregarHijo("ToCharArray");
            nodo.agregarHijo("(");
            nodo.agregarHijo(this.expresion.getNodo());
            nodo.agregarHijo(")");
            return nodo;
        } catch (err) {
            var nodo: NodoAST = new NodoAST("ToCharArray");
            return nodo;
        }
    }

}