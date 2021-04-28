import LinkedList from 'ts-linked-list';

export class NodoAST {
    hijos: LinkedList<NodoAST>;
    valor: String;

    constructor(valor: String) {
        this.hijos = new LinkedList();
        this.valor = valor;
    }


    public setHijos(hijos: LinkedList<NodoAST>): void {
        this.hijos = hijos;
    }

    public agregarHijo(hijo: any): void {
        if (hijo instanceof NodoAST) {
            this.hijos.append(hijo);
        } else {
            this.hijos.append(new NodoAST(<String>hijo));
        }
    }

    public agregarHijos(hijos: LinkedList<NodoAST>): void {
        hijos.forEach(hijo => this.hijos.append(hijo));
    }

    public agregarPrimerHijo(hijo: any): void {
        if (hijo instanceof String) {
            this.hijos.push(new NodoAST(hijo));
        } else if (hijo instanceof NodoAST) {
            this.hijos.push(hijo);
        }
    }

    public getValor(): String {
        return this.valor;
    }

    public setValor(cad: String): void {
        this.valor = cad;
    }

    public getHijos(): LinkedList<NodoAST> {
        return this.hijos;
    }
}