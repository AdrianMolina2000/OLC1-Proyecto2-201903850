"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Table {
    constructor(Anterior) {
        this.Anterior = Anterior;
        this.Variables = new Map();
    }
    setVariable(simbol) {
        let ambito;
        for (ambito = this; ambito != null; ambito = ambito.Anterior) {
            for (let key of Array.from(ambito.Variables.keys())) {
                if (key === simbol.id) {
                    return `La variable ${key} ya ha sido declarada.`;
                }
            }
        }
        this.Variables.set(simbol.id, simbol);
        return null;
    }
    getVariable(id) {
        let ambito;
        for (ambito = this; ambito != null; ambito = ambito.Anterior) {
            for (let key of Array.from(ambito.Variables.keys())) {
                if (key === id) {
                    return ambito.Variables.get(key);
                }
            }
        }
        return null;
    }
}
exports.Table = Table;
