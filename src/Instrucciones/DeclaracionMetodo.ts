import { Nodo } from "../Abstract/Nodo"
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Excepcion } from "../other/Excepcion";
import { Tipo, tipos } from "../other/Tipo";
import { Simbolo } from "../Simbols/Simbolo";
import { NodoAST } from "../Abstract/NodoAST";
import { Declaracion } from "./Declaracion";


export class DeclaracionMetodo extends Nodo {
    id: String;
    listaParams: Array<Nodo>;
    instrucciones: Array<Nodo>;

    constructor(id: String, listaParams: Array<Nodo>, instrucciones: Array<Nodo>, line: Number, column: Number) {
        super(new Tipo(tipos.VOID), line, column);
        this.id = id;
        this.listaParams = listaParams;
        this.instrucciones = instrucciones;
    }

    execute(table: Table, tree: Tree):any {
        
        var nombre = this.id + "$";

        if(this.listaParams.length == 0){
            nombre += "SP"
        }else{
            for(let param of this.listaParams){
                nombre += param.tipo;
            }
        }

        if(table.getVariable(nombre) == null){
            var metodo = new Simbolo(this.tipo, nombre, [this.listaParams, this.instrucciones]);
            table.setVariable(metodo)
        }else{
            const error = new Excepcion('Semantico',
                `El metodo {${nombre}} ya ha sido creado con anterioridad `,
                this.line, this.column);
            tree.excepciones.push(error);
            tree.consola.push(error.toString());
            return error;
        }
    }

    getNodo() {
        var nodo:NodoAST  = new NodoAST("DECLARACION METODO");
        nodo.agregarHijo("Void");
        nodo.agregarHijo(this.id);
        nodo.agregarHijo("(");
        if(this.listaParams.length != 0){
            var nodo2:NodoAST  = new NodoAST("Parametros");
            var index = 1;
            for(let i = 0; i<this.listaParams.length; i++){
                var param = <Declaracion>this.listaParams[i]
                var nodo3:NodoAST  = new NodoAST(param.tipo + "");
                nodo3.agregarHijo(param.id + "");
                nodo2.agregarHijo(nodo3);
            }
            nodo.agregarHijo(nodo2);
        }
            
        nodo.agregarHijo(")");
        nodo.agregarHijo("{");
        
        var nodo3:NodoAST  = new NodoAST("INSTRUCCIONES");
        for(let i = 0; i<this.instrucciones.length; i++){
            nodo3.agregarHijo(this.instrucciones[i].getNodo());
        }
        nodo.agregarHijo(nodo3);
        nodo.agregarHijo("}");
        return nodo;
    }
}