"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = require("../Abstract/Nodo");
const Excepcion_1 = require("../other/Excepcion");
const Tipo_1 = require("../other/Tipo");
class Asignacion extends Nodo_1.Nodo {
    constructor(id, valor, line, column) {
        super(null, line, column);
        this.id = id;
        this.valor = valor;
    }
    execute(table, tree) {
        const result = this.valor.execute(table, tree);
        if (result instanceof Excepcion_1.Excepcion) {
            return result;
        }
        let variable;
        variable = table.getVariable(this.id);
        if (variable == null) {
            const error = new Excepcion_1.Excepcion('Semantico', `La variable {${this.id}} no ha sido encontrada`, this.line, this.column);
            tree.excepciones.push(error);
            tree.consola.push(error.toString());
            return error;
        }
        if (this.valor.tipo.tipo != variable.tipo.tipo) {
            if (variable.tipo.tipo == Tipo_1.tipos.DECIMAL && (this.valor.tipo.tipo == Tipo_1.tipos.DECIMAL || this.valor.tipo.tipo == Tipo_1.tipos.ENTERO)) {
                this.valor.tipo.tipo = Tipo_1.tipos.DECIMAL;
            }
            else {
                const error = new Excepcion_1.Excepcion('Semantico', `La variable no puede ser declarada debido a que son de diferentes tipos`, this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        }
        variable.valor = result;
        return null;
    }
}
exports.Asignacion = Asignacion;
