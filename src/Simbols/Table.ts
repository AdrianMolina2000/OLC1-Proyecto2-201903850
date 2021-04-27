import {Simbolo} from "./Simbolo";

export class Table{
    Anterior: Table;
    Variables: Map<String, Simbolo>;

    constructor(Anterior: Table){
        this.Anterior = Anterior;
        this.Variables = new Map<String, Simbolo>();
    }

    setVariable(simbol: Simbolo){
        let ambito: Table;
        for(ambito = this; ambito!= null; ambito = ambito.Anterior){
            for(let key of Array.from(ambito.Variables.keys())) {
                if(key === simbol.id){
                    // return `La variable ${key} ya ha sido declarada.`;
                    return this.Variables.set(simbol.id, simbol);
                }
            }
        }
        this.Variables.set(simbol.id, simbol);
        return null;
    }
    
    getVariable(id: String): Simbolo{
        let ambito: Table;
        for(ambito = this; ambito != null; ambito = ambito.Anterior){
            for(let key of Array.from( ambito.Variables.keys()) ) {
                if(key === id){
                    return ambito.Variables.get(key);
                }
            }
        }
        return null;
    }
}