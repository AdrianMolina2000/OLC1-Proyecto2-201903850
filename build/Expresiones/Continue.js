"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = require("../Abstract/Nodo");
class Continue extends Nodo_1.Nodo {
    constructor(line, column) {
        super(null, line, column);
    }
    execute(table, tree) {
        return this;
    }
}
exports.Continue = Continue;
