"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = require("../Abstract/Nodo");
const NodoAST_1 = require("../Abstract/NodoAST");
const Excepcion_1 = require("../other/Excepcion");
const Tipo_1 = require("../other/Tipo");
function esEntero(numero) {
    if (numero % 1 == 0) {
        return true;
    }
    else {
        return false;
    }
}
class Aritmetica extends Nodo_1.Nodo {
    constructor(operadorIzq, operadorDer, operador, line, column) {
        super(null, line, column);
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.operador = operador;
    }
    execute(table, tree) {
        if (this.operadorIzq !== null) {
            const resultadoIzq = this.operadorIzq.execute(table, tree);
            if (resultadoIzq instanceof Excepcion_1.Excepcion) {
                return resultadoIzq;
            }
            const resultadoDerecho = this.operadorDer.execute(table, tree);
            if (resultadoDerecho instanceof Excepcion_1.Excepcion) {
                return resultadoDerecho;
            }
            if (this.operador === '+') {
                //ENTERO + 
                if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.ENTERO) {
                    //ENTERO + ENTERO = ENTERO
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                        return resultadoIzq + resultadoDerecho;
                        //ENTERO + DECIMAL = DECIMAL
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq + resultadoDerecho;
                        //ENTERO + BOOLEAN = ENTERO
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.BOOLEANO) {
                        if (resultadoDerecho === true) {
                            this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                            return resultadoIzq + 1;
                        }
                        else {
                            this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                            return resultadoIzq;
                        }
                        //ENTERO + CHAR = ENTERO
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.CARACTER) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                        return resultadoIzq + resultadoDerecho.charCodeAt(0);
                        //ENTERO + STRING = STRING
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.STRING) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.STRING);
                        return resultadoIzq + resultadoDerecho;
                    }
                    //DOUBLE + 
                }
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                    //DOUBLE + ENTERO = DOUBLE
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq + resultadoDerecho;
                        //DOUBLE + DOUBLE = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq + resultadoDerecho;
                        //DOUBLE + BOOLEANO = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.BOOLEANO) {
                        if (resultadoDerecho === true) {
                            this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                            return resultadoIzq + 1;
                        }
                        else {
                            this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                            return resultadoIzq;
                        }
                        //DOUBLE + CARACTER = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.CARACTER) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq + resultadoDerecho.charCodeAt(0);
                        //DOUBLE + STRING = STRING
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.STRING) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.STRING);
                        return resultadoIzq + resultadoDerecho;
                    }
                    //BOOLEAN +
                }
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.BOOLEANO) {
                    //BOOL + ENTERO = ENTERO
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        if (resultadoIzq === true) {
                            this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                            return resultadoDerecho + 1;
                        }
                        else {
                            this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                            return resultadoDerecho;
                        }
                        //BOOL + DOUBLE = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        if (resultadoIzq === true) {
                            this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                            return resultadoDerecho + 1;
                        }
                        else {
                            this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                            return resultadoDerecho;
                        }
                        //BOOL + STRING = STRING
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.STRING) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.STRING);
                        return resultadoIzq + resultadoDerecho;
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Sumar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                    //CHAR +
                }
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.CARACTER) {
                    //CHAR + ENTERO = ENTERO
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                        return resultadoIzq.charCodeAt(0) + resultadoDerecho;
                        //CHAR + DOUBLE = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq.charCodeAt(0) + resultadoDerecho;
                        //CHAR + CHAR = STRING
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.CARACTER) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.STRING);
                        return resultadoIzq + resultadoDerecho;
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.STRING) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.STRING);
                        return resultadoIzq + resultadoDerecho;
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Sumar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                    //STRING
                }
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.STRING) {
                    //STRING + ENTERO = ENTERO
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.STRING);
                        return resultadoIzq + resultadoDerecho;
                        //STRING + DOUBLE = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.STRING);
                        return resultadoIzq + resultadoDerecho;
                        //STRING + CHAR = STRING
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.CARACTER) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.STRING);
                        return resultadoIzq + resultadoDerecho;
                        //STRING + BOOLEAN = STRING
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.BOOLEANO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.STRING);
                        return resultadoIzq + resultadoDerecho;
                        //STRING + STRING = STRING
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.STRING) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.STRING);
                        return resultadoIzq + resultadoDerecho;
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Sumar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                }
                else {
                    const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Sumar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            }
            else if (this.operador === '-') {
                //ENTERO - 
                if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.ENTERO) {
                    //ENTERO - ENTERO = ENTERO
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                        return resultadoIzq - resultadoDerecho;
                        //ENTERO - DECIMAL = DECIMAL
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq - resultadoDerecho;
                        //ENTERO - BOOLEAN = ENTERO
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.BOOLEANO) {
                        if (resultadoDerecho === true) {
                            this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                            return resultadoIzq - 1;
                        }
                        else {
                            this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                            return resultadoIzq;
                        }
                        //ENTERO - CHAR = ENTERO
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.CARACTER) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                        return resultadoIzq - resultadoDerecho.charCodeAt(0);
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Restar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                    //DOUBLE -
                }
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                    //DOUBLE - ENTERO = DOUBLE
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq - resultadoDerecho;
                        //DOUBLE - DOUBLE = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq - resultadoDerecho;
                        //DOUBLE - BOOLEANO = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.BOOLEANO) {
                        if (resultadoDerecho === true) {
                            this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                            return resultadoIzq - 1;
                        }
                        else {
                            this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                            return resultadoIzq;
                        }
                        //DOUBLE - CARACTER = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.CARACTER) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq - resultadoDerecho.charCodeAt(0);
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Restar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                    //BOOLEAN -
                }
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.BOOLEANO) {
                    //BOOL - ENTERO = ENTERO
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        if (resultadoIzq === true) {
                            this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                            return 1 - resultadoDerecho;
                        }
                        else {
                            this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                            return 0 - resultadoDerecho;
                        }
                        //BOOL - DOUBLE = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        if (resultadoIzq === true) {
                            this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                            return 1 - resultadoDerecho;
                        }
                        else {
                            this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                            return 0 - resultadoDerecho;
                        }
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Restar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                    //CHAR -
                }
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.CARACTER) {
                    //CHAR - ENTERO = ENTERO
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                        return resultadoIzq.charCodeAt(0) - resultadoDerecho;
                        //CHAR - DOUBLE = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq.charCodeAt(0) - resultadoDerecho;
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Restar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                }
                else {
                    const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Restar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            }
            else if (this.operador === '*') {
                //ENTERO * 
                if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.ENTERO) {
                    //ENTERO * ENTERO = ENTERO
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                        return resultadoIzq * resultadoDerecho;
                        //ENTERO * DECIMAL = DECIMAL
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq * resultadoDerecho;
                        //ENTERO * CHAR = ENTERO
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.CARACTER) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                        return resultadoIzq * resultadoDerecho.charCodeAt(0);
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Multiplicar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                    //DOUBLE *
                }
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                    //DOUBLE * ENTERO = DOUBLE
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq * resultadoDerecho;
                        //DOUBLE * DOUBLE = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq * resultadoDerecho;
                        //DOUBLE * CHAR = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.CARACTER) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq * resultadoDerecho.charCodeAt(0);
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Multiplicar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                    //CHAR *
                }
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.CARACTER) {
                    //CHAR * ENTERO = ENTERO
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                        return resultadoIzq.charCodeAt(0) * resultadoDerecho;
                        //CHAR * DOUBLE = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq.charCodeAt(0) * resultadoDerecho;
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Multiplicar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                }
                else {
                    const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Multiplicar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            }
            else if (this.operador === '/') {
                //DIVISION SOBRE 0
                if (resultadoDerecho === 0) {
                    const error = new Excepcion_1.Excepcion('Semantico', `Error aritmetico, La division con cero no esta permitida`, this.line, this.column);
                    tree.excepciones.push(error);
                    return error;
                }
                //ENTERO / 
                if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.ENTERO) {
                    //ENTERO / ENTERO = DOUBLE
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq / resultadoDerecho;
                        //DECIMAL / DECIMAL = DECIMAL
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq / resultadoDerecho;
                        //ENTERO / CHAR = DECIMAL
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.CARACTER) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq / resultadoDerecho.charCodeAt(0);
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Dividir los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                    //DOUBLE /
                }
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                    //DOUBLE / ENTERO = DOUBLE
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq / resultadoDerecho;
                        //DOUBLE / DOUBLE = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq / resultadoDerecho;
                        //DOUBLE / CHAR = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.CARACTER) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq / resultadoDerecho.charCodeAt(0);
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Dividir los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                    //CHAR /
                }
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.CARACTER) {
                    //CHAR / ENTERO = DECIMAL
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq.charCodeAt(0) / resultadoDerecho;
                        //CHAR / DOUBLE = DECIMAL
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq.charCodeAt(0) / resultadoDerecho;
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Dividir los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                }
                else {
                    const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Dividir los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            }
            else if (this.operador === '^') {
                //ENTERO ^ 
                if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.ENTERO) {
                    //ENTERO ^ ENTERO = ENTERO
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                        return Math.pow(resultadoIzq, resultadoDerecho);
                        //ENTERO ^ DECIMAL = DECIMAL
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return Math.pow(resultadoIzq, resultadoDerecho);
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Potenciar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                    //DOUBLE ^
                }
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                    //DOUBLE ^ ENTERO = DOUBLE
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return Math.pow(resultadoIzq, resultadoDerecho);
                        //DOUBLE ^ DOUBLE = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return Math.pow(resultadoIzq, resultadoDerecho);
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Potenciar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                }
                else {
                    const error = new Excepcion_1.Excepcion('Semantico', `No se pueden Potenciar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            }
            else if (this.operador === '%') {
                //ENTERO % 
                if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.ENTERO) {
                    //ENTERO % ENTERO = DOUBLE
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq % resultadoDerecho;
                        //ENTERO ^ DECIMAL = DECIMAL
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq % resultadoDerecho;
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se puede aplicar modulo con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                    //DOUBLE ^
                }
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                    //DOUBLE % ENTERO = DOUBLE
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq % resultadoDerecho;
                        //DOUBLE % DOUBLE = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq % resultadoDerecho;
                    }
                    else {
                        const error = new Excepcion_1.Excepcion('Semantico', `No se puede aplicar modulo los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                }
                else {
                    const error = new Excepcion_1.Excepcion('Semantico', `No se puede aplicar modulo los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            }
            else {
                const error = new Excepcion_1.Excepcion('Semantico', `Error, Operador desconocido`, this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        }
        else {
            const resultadoDerecho = this.operadorDer.execute(table, tree);
            if (resultadoDerecho instanceof Excepcion_1.Excepcion) {
                return resultadoDerecho;
            }
            if (this.operador === '-') {
                if (this.operadorDer.tipo.tipo === Tipo_1.tipos.ENTERO) {
                    this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                    return -1 * resultadoDerecho;
                }
                else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                    this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                    return -1 * resultadoDerecho;
                }
            }
            else {
                const error = new Excepcion_1.Excepcion('Semantico', `Error, Operador desconocido`, this.line, this.column);
                tree.excepciones.push(error);
                tree.consola.push(error.toString());
                return error;
            }
        }
    }
    getNodo() {
        var nodo = new NodoAST_1.NodoAST("ARITMETICA");
        if (this.operadorIzq != null) {
            nodo.agregarHijo(this.operadorIzq.getNodo());
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo(this.operadorDer.getNodo());
        }
        else {
            nodo.agregarHijo(this.operador + "");
            nodo.agregarHijo(this.operadorDer.getNodo());
        }
        return nodo;
    }
}
exports.Aritmetica = Aritmetica;
