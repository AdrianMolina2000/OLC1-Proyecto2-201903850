"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function graphAST(raiz) {
    var r = "AST";
    var ext = "pdf";
    var fs = require('fs');
    var stream = fs.createWriteStream(`./src/Reportes/${r}.dot`);
    stream.once('open', function () {
        stream.write(getDot(raiz));
        stream.end();
    });
    const exec = require('child_process').exec;
    exec(`dot -T pdf -o ./src/Reportes/${r}.${ext} ./src/Reportes/${r}.dot`, (err, stdout) => {
        if (err) {
            throw err;
        }
        console.log(stdout);
    });
}
exports.graphAST = graphAST;
var c;
var grafo;
function getDot(raiz) {
    grafo = "";
    grafo += "digraph {\n"; //                         "     \"
    grafo += "n0[label=\"" + raiz.getValor().replace("\"", "\\\"") + "\"];\n";
    c = 1;
    recorrerAST("n0", raiz);
    grafo += "}";
    return grafo;
}
function recorrerAST(padre, nPadre) {
    nPadre.getHijos().forEach(hijo => {
        var nombreHijo = "n" + c;
        grafo += nombreHijo + "[label=\"" + hijo.getValor().replace("\"", "\\\"") + "\"];\n";
        grafo += padre + "->" + nombreHijo + ";\n";
        c++;
        recorrerAST(nombreHijo, hijo);
    });
}
