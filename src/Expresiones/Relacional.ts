import { Nodo } from "../Abstract/Nodo";
import { Table } from "../Simbols/Table";
import { Tree } from "../Simbols/Tree";
import { Excepcion } from "../other/Excepcion";
import { tipos, Tipo } from "../other/Tipo";

export class Relacional extends Nodo {
    operadorIzq: Nodo;
    operadorDer: Nodo;
    operador: String;

    constructor(operadorIzq: Nodo, operadorDer: Nodo, operador: String, line: Number, column: Number) {
        super(new Tipo(tipos.BOOLEANO), line, column);
        this.operadorIzq = operadorIzq;
        this.operadorDer = operadorDer;
        this.operador = operador;
    }

    execute(table: Table, tree: Tree) {
        const resultadoIzq = this.operadorIzq.execute(table, tree);
        if (resultadoIzq instanceof Excepcion) {
            return resultadoIzq;
        }
        const resultadoDer = this.operadorDer.execute(table, tree);
        if (resultadoDer instanceof Excepcion) {
            return resultadoDer;
        }

        if (this.operador === '<') {
            if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq < resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq < resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq < resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional MENOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq < resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq < resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq < resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional MENOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.CARACTER) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq.charCodeAt(0) < resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq.charCodeAt(0) < resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq.charCodeAt(0) < resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional MENOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.BOOLEANO) {
                if (this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return resultadoIzq < resultadoDer;
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional MENOR QUE se esta tratando de operar con los tipos${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else {
                const error = new Excepcion('Semantico',
                    `El operador relacional MENOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                // tree.consola.push(error.toString());
                return error;
            }
        }else if (this.operador === '<=') {
            if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq <= resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq <= resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq <= resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional MENOR IGUAL QUE se esta tratando de operar con los tipos${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq <= resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq <= resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq <= resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional MENOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.CARACTER) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq.charCodeAt(0) <= resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq.charCodeAt(0) <= resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq.charCodeAt(0) <= resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional MENOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.BOOLEANO) {
                if (this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return resultadoIzq <= resultadoDer;
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional MENOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else {
                const error = new Excepcion('Semantico',
                    `El operador relacional MENOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                // tree.consola.push(error.toString());
                return error;
            }
        } else if (this.operador === '>') {
            if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq > resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq > resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq > resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional MAYOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq > resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq > resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq > resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional MAYOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.CARACTER) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq.charCodeAt(0) > resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq.charCodeAt(0) > resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq.charCodeAt(0) > resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional MAYOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.BOOLEANO) {
                if (this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return resultadoIzq > resultadoDer;
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional MAYOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else {
                const error = new Excepcion('Semantico',
                    `El operador relacional MAYOR QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                // tree.consola.push(error.toString());
                return error;
            }
        } else if (this.operador === '>=') {
            if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq >= resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq >= resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq >= resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional MAYOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq >= resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq >= resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq >= resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional MAYOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.CARACTER) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq.charCodeAt(0) >= resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq.charCodeAt(0) >= resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq.charCodeAt(0) >= resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional MAYOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.BOOLEANO) {
                if (this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return resultadoIzq >= resultadoDer;
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional MAYOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else {
                const error = new Excepcion('Semantico',
                    `El operador relacional MAYOR IGUAL QUE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                // tree.consola.push(error.toString());
                return error;
            }
        } else if (this.operador === '!=') {
            if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq != resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq != resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq != resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional DIFERENTE DE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq != resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq != resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq != resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional DIFERENTE DE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.CARACTER) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq.charCodeAt(0) != resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq.charCodeAt(0) != resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq.charCodeAt(0) != resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional DIFERENTE DE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.BOOLEANO) {
                if (this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return resultadoIzq != resultadoDer;
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional DIFERENTE DE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else {
                const error = new Excepcion('Semantico',
                    `El operador relacional DIFERENTE DE se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                // tree.consola.push(error.toString());
                return error;
            }
        } else if (this.operador === '==') {
            if (this.operadorIzq.tipo.tipo === tipos.ENTERO) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq == resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq == resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq == resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional IGUAL A se esta tratando de operar con los tipos${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.DECIMAL) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq == resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq == resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq == resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional IGUAL A se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.CARACTER) {
                if (this.operadorDer.tipo.tipo === tipos.ENTERO) {
                    return resultadoIzq.charCodeAt(0) == resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.DECIMAL) {
                    return resultadoIzq.charCodeAt(0) == resultadoDer;
                } else if (this.operadorDer.tipo.tipo === tipos.CARACTER) {
                    return resultadoIzq.charCodeAt(0) == resultadoDer.charCodeAt(0);
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional IGUAL A se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else if (this.operadorIzq.tipo.tipo === tipos.BOOLEANO) {
                if (this.operadorDer.tipo.tipo === tipos.BOOLEANO) {
                    return resultadoIzq == resultadoDer;
                } else {
                    const error = new Excepcion('Semantico',
                        `El operador relacional IGUAL A se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                        this.line, this.column);
                    tree.excepciones.push(error);
                    // tree.consola.push(error.toString());
                    return error;
                }
            } else {
                const error = new Excepcion('Semantico',
                    `El operador relacional IGUAL A se esta tratando de operar con los tipos ${this.operadorIzq.tipo} y ${this.operadorDer.tipo}`,
                    this.line, this.column);
                tree.excepciones.push(error);
                // tree.consola.push(error.toString());
                return error;
            }
        } else {
            const error = new Excepcion('Semantico',
                `Operador desconocido`,
                this.line, this.column);
            tree.excepciones.push(error);
            // tree.consola.push(error.toString());
            return error;
        }
    }
}