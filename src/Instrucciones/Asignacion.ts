import { Nodo} from "../Abstract/Nodo";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Excepcion } from "../other/Excepcion";
import { Simbolo } from "../Simbols/Simbolo";
import { tipos } from "../other/Tipo";


export class Asignacion extends Nodo {
    id: String;
    valor: Nodo;

    constructor(id: String, valor: Nodo, line: Number, column: Number) {
        super(null, line, column);
        this.id = id;
        this.valor = valor;
    }

    execute(table: Table, tree: Tree) {
        const result = this.valor.execute(table, tree);
        if (result instanceof Excepcion) {
            return result;
        }

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

        if (this.valor.tipo.tipo != variable.tipo.tipo) {
            if (variable.tipo.tipo == tipos.DECIMAL && (this.valor.tipo.tipo == tipos.DECIMAL || this.valor.tipo.tipo == tipos.ENTERO)) {
                this.valor.tipo.tipo = tipos.DECIMAL;
            } else {
                const error = new Excepcion('Semantico',
                    `La variable no puede ser declarada debido a que son de diferentes tipos`,
                    this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        }
        variable.valor = result;
        return null;
    }
}