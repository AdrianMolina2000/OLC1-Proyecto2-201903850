import { NodoAST } from "./Abstract/NodoAST";

export function graphAST(raiz: NodoAST): void {
    var r: String = "AST";
    var ext: String = "pdf";
    var fs = require('fs');
    
    var stream = fs.createWriteStream(`./src/Reportes/${r}.dot`);

    stream.once('open', function () {
        stream.write(getDot(raiz));
        stream.end();
    });

    const exec = require('child_process').exec;
    exec(`dot -T pdf -o ./src/Reportes/${r}.${ext} ./src/Reportes/${r}.dot`,(err:any,stdout:any) => {
        if(err){
            throw err;
        }
        console.log(stdout);
    });
}

var c: number;
var grafo: String;

function getDot(raiz: NodoAST): String {
    grafo = "";
    grafo += "digraph {\n";//                         "     \"
    grafo += "n0[label=\"" + raiz.getValor().replace("\"", "\\\"") + "\"];\n";
    c = 1;
    recorrerAST("n0", raiz);
    grafo += "}";
    return grafo;
}

function recorrerAST(padre: String, nPadre: NodoAST): void {
    nPadre.getHijos().forEach(hijo => {
        var nombreHijo:String = "n" + c;
        grafo += nombreHijo + "[label=\"" + hijo.getValor().replace("\"", "\\\"") + "\"];\n";
        grafo += padre + "->" + nombreHijo + ";\n";
        c++;
        recorrerAST(nombreHijo, hijo);
    });
}