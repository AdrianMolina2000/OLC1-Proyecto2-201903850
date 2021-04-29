// import { Nodo } from "../Abstract/Nodo"
// import { Table } from "../Simbols/Table";
// import { Tree } from "../Simbols/Tree";
// import { Excepcion } from "../other/Excepcion";
// import { Tipo, tipos } from "../other/Tipo";
// import { Simbolo } from "../Simbols/Simbolo";
// import { NodoAST } from "../Abstract/NodoAST";


// export class DeclaracionMetodo extends Nodo {
//     id: String;
//     listaParams: Array<Nodo>;
//     instrucciones: Array<Nodo>;

//     constructor(id: String, listaParams: Array<Nodo>, instrucciones: Array<Nodo>, line: Number, column: Number) {
//         super(null, line, column);
//         this.id = id;
//         this.listaParams = listaParams;
//         this.instrucciones = instrucciones;
//     }

//     execute(table: Table, tree: Tree):any {
        
//         const result = new Array<Array<Nodo>>(this.listaParams, this.instrucciones);
//         let simbolo: Simbolo;
//         simbolo = new Simbolo(new Tipo(tipos.VOID), this.id, result);
        
//         table.setVariable(simbolo);
//         return null;
//     }

//     getNodo() {
//         var nodo:NodoAST  = new NodoAST("DECLARACION METODO");
//         return nodo;
//     }
// }