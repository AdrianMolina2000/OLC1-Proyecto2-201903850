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
                if (key.toLowerCase() === simbol.id.toLowerCase()) {
                    // return `La variable ${key} ya ha sido declarada.`;
                    return this.Variables.set(simbol.id.toLowerCase(), simbol);
                }
            }
        }
        this.Variables.set(simbol.id.toLowerCase(), simbol);
        return null;
    }
    getVariable(id) {
        let ambito;
        for (ambito = this; ambito != null; ambito = ambito.Anterior) {
            for (let key of Array.from(ambito.Variables.keys())) {
                if (key.toLowerCase() === id.toLowerCase()) {
                    return ambito.Variables.get(key.toLocaleLowerCase());
                }
            }
        }
        return null;
    }
}
exports.Table = Table;
