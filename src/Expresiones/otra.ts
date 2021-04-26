import { Nodo } from "../Abstract/Nodo";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Excepcion } from "../other/Excepcion";
import { Simbolo } from "../Simbols/Simbolo";
import { Tipo, tipos } from "../other/Tipo";


export class Asignacion extends Nodo {
    id: String;
    operador: String;
    valor: Nodo;

    constructor(id: String, operador: String, line: Number, column: Number) {
        super(null, line, column);
        this.id = id;
        this.operador = operador;
    }

    execute(table: Table, tree: Tree) {

        let variable: Simbolo;
        variable = table.getVariable(this.id);
        if (variable == null) {
            const error = new Excepcion('Semantico',
                `La variable {${this.id}} no ha sido encontrada`,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.consola.push(error.toString());
            return error;
        }
        this.tipo = variable.tipo;

        if (variable.tipo.tipo === tipos.ENTERO) {
            if (this.operador === "++") {
                variable.valor = <tipos.ENTERO>variable.valor + 1;
                return <tipos.ENTERO>variable.valor;
            } else if (this.operador === "--") {
                variable.valor = <tipos.ENTERO>variable.valor - 1;
                return <tipos.ENTERO>variable.valor;
            } else {
                const error = new Excepcion('Semantico',
                    `No se puede Incrementar o Decrementar el tipo ${variable.tipo}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        } else if (variable.tipo.tipo === tipos.DECIMAL) {
            if (this.operador === "++") {
                variable.valor = <tipos.DECIMAL>variable.valor + 1;
                return <tipos.DECIMAL>variable.valor;
            } else if (this.operador === "--") {
                variable.valor = <tipos.DECIMAL>variable.valor - 1;
                return <tipos.DECIMAL>variable.valor;
            } else {
                const error = new Excepcion('Semantico',
                    `No se puede Incrementar o Decrementar el tipo ${variable.tipo}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        } else {
            const error = new Excepcion('Semantico',
                `No se puede Incrementar o Decrementar el tipo ${variable.tipo}`,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.consola.push(error.toString());
            return error;
        }
    }
}