import {Nodo} from "../Abstract/Nodo";
import {Excepcion} from "../other/Excepcion";

export class Tree {
    instrucciones: Array<Nodo>
    excepciones: Array<Excepcion>
    consola: Array<String>

    constructor(instrucciones: Array<Nodo>) {
        this.instrucciones = instrucciones;
        this.excepciones = new Array<Excepcion>();
        this.consola = new Array<String>();
    }
}