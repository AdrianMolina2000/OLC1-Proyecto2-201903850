"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Excepcion {
    constructor(tipo, descripcion, line, column) {
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.line = line;
        this.column = column;
    }
    toString() {
        return `Error ${this.tipo} en la linea ${this.line} y columna ${this.column}, ${this.descripcion}`;
    }
}
exports.Excepcion = Excepcion;
