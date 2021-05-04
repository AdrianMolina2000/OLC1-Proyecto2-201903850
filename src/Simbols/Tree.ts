import {Nodo} from "../Abstract/Nodo";
import {Excepcion} from "../other/Excepcion";
import { Simbolo } from "./Simbolo";

export class Tree {
    instrucciones: Array<Nodo>
    excepciones: Array<Excepcion>
    consola: Array<String>
    Variables: Array<Simbolo>;

    constructor(instrucciones: Array<Nodo>) {
        this.instrucciones = instrucciones;
        this.excepciones = new Array<Excepcion>();
        this.consola = new Array<String>();
        this.Variables = new Array<Simbolo>();
    }
}