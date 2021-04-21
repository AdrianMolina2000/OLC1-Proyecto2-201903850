import {Tipo} from "../other/tipo";

export class Simbolo {
    tipo: Tipo;
    id: String
    valor: Object

    constructor(tipo: Tipo, id: String, valor: Object) {
        this.tipo = tipo;
        this.id = id;
        this.valor = valor;
    }
}