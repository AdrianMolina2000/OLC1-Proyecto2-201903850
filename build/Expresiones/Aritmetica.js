"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = require("../Abstract/Nodo");
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
        if (this.operadorDer !== null) {
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
                if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.NUMERO && esEntero(resultadoIzq)) {
                    //ENTERO + ENTERO = ENTERO
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.NUMERO && esEntero(resultadoDerecho)) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                        return resultadoIzq + resultadoDerecho;
                        //ENTERO + DECIMAL = DECIMAL
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.NUMERO && !esEntero(resultadoDerecho)) {
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
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.NUMERO && !esEntero(resultadoIzq)) {
                    //DOUBLE + ENTERO = DOUBLE
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.NUMERO && esEntero(resultadoDerecho)) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                        return resultadoIzq + resultadoDerecho;
                        //DOUBLE + DOUBLE = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.NUMERO && !esEntero(resultadoDerecho)) {
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
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.NUMERO && esEntero(resultadoDerecho)) {
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
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.NUMERO && !esEntero(resultadoDerecho)) {
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
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden operar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                    //CHAR +
                }
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.CARACTER) {
                    //CHAR + ENTERO = ENTERO
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.NUMERO && esEntero(resultadoDerecho)) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                        return resultadoIzq.charCodeAt(0) + resultadoDerecho;
                        //CHAR + DOUBLE = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.NUMERO && !esEntero(resultadoDerecho)) {
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
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden operar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                    //STRING
                }
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.STRING) {
                    //STRING + ENTERO = ENTERO
                    if (this.operadorDer.tipo.tipo === Tipo_1.tipos.NUMERO && esEntero(resultadoDerecho)) {
                        this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.STRING);
                        return resultadoIzq + resultadoDerecho;
                        //STRING + DOUBLE = DOUBLE
                    }
                    else if (this.operadorDer.tipo.tipo === Tipo_1.tipos.NUMERO && !esEntero(resultadoDerecho)) {
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
                        const error = new Excepcion_1.Excepcion('Semantico', `No se pueden operar los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`, this.line, this.column);
                        tree.excepciones.push(error);
                        // tree.consola.push(error.toString());
                        return error;
                    }
                }
            }
            //  else if (this.operador === '-') {
            //     if (this.operadorIzq.tipo.tipo === tipos.NUMERIC && this.operadorDer.tipo.tipo === tipos.NUMERIC) {
            //         this.tipo = new Tipo(tipos.NUMERIC);
            //         return resultadoIzq - resultadoDerecho;
            //     } else {
            //         console.log(this.operadorIzq)
            //         const error = new Excepcion('Semantico',
            //             `Error de tipos en la resta se esta tratando de operar ${this.operadorIzq.tipo.tipo} y ${this.operadorDer.tipo.tipo}`,
            //             this.line, this.column);
            //         tree.excepciones.push(error);
            //         tree.console.push(error.toString());
            //         return error;
            //     }
            // } else if (this.operador === '*') {
            //     if (this.operadorIzq.tipo.tipo === tipos.NUMERIC && this.operadorDer.tipo.tipo === tipos.NUMERIC) {
            //         this.tipo = new Tipo(tipos.NUMERIC);
            //         return resultadoIzq * resultadoDerecho;
            //     } else {
            //         const error = new Excepcion('Semantico',
            //             `Error de tipos en la multiplicacion se esta tratando de operar ${this.operadorIzq.tipo.tipo} y ${this.operadorDer.tipo.tipo}`,
            //             this.line, this.column);
            //         tree.excepciones.push(error);
            //         tree.console.push(error.toString());
            //         return error;
            //     }
            // } else if (this.operador === '/') {
            //     if (this.operadorIzq.tipo.tipo === tipos.NUMERIC && this.operadorDer.tipo.tipo === tipos.NUMERIC) {
            //         this.tipo = new Tipo(tipos.NUMERIC);
            //         if (resultadoDerecho === 0) {
            //             const error = new Excepcion('Semantico',
            //                 `Error aritmetico, La division con cero no esta permitida`,
            //                 this.line, this.column);
            //             tree.excepciones.push(error);
            //             tree.console.push(error.toString());
            //             return error;
            //         }
            //         return resultadoIzq / resultadoDerecho;
            //     } else {
            //         const error = new Excepcion('Semantico',
            //             `Error de tipos en la division se esta tratando de operar ${this.operadorIzq.tipo.tipo} y ${this.operadorDer.tipo.tipo}`,
            //             this.line, this.column);
            //         tree.excepciones.push(error);
            //         tree.console.push(error.toString());
            //         return error;
            //     }
            // } else {
            //     const error = new Excepcion('Semantico',
            //         `Error, Operador desconocido`,
            //         this.line, this.column);
            //     tree.excepciones.push(error);
            //     tree.console.push(error.toString());
            //     return error;
            // }
        }
        else {
            const resultadoIzq = this.operadorIzq.execute(table, tree);
            if (resultadoIzq instanceof Excepcion_1.Excepcion) {
                return resultadoIzq;
            }
            if (this.operador === '-') {
                if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.ENTERO) {
                    this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.ENTERO);
                    return -1 * resultadoIzq;
                }
                else if (this.operadorIzq.tipo.tipo === Tipo_1.tipos.DECIMAL) {
                    this.tipo = new Tipo_1.Tipo(Tipo_1.tipos.DECIMAL);
                    return -1 * resultadoIzq;
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
}
exports.Aritmetica = Aritmetica;
