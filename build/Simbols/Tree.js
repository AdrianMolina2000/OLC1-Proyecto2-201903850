"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Tree {
    constructor(instrucciones) {
        this.instrucciones = instrucciones;
        this.excepciones = new Array();
        this.consola = new Array();
        this.Variables = new Array();
    }
}
exports.Tree = Tree;
