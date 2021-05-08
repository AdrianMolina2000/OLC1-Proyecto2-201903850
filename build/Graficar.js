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
function graphTabla(tabla) {
    var fs = require('fs');
    var stream = fs.createWriteStream(`./src/Reportes/TablaSimbolos.html`);
    let documento = "";
    stream.once('open', function () {
        stream.write(escribirHtml(tabla, documento));
        stream.end();
    });
}
exports.graphTabla = graphTabla;
function escribirHtml(tabla, documento) {
    documento += "<!DOCTYPE html>\n<html>\n<head>\n";
    documento += "   <meta charset='UTF-8'>\n";
    documento += "   <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css'>\n";
    documento += "</head>\n";
    documento += "<body class='container grey lighten-1'>\n";
    documento += "<h2>Tabla de Simbolos</h2>\n";
    documento += "   <table class='highlight'>\n";
    documento += "       <thead>\n";
    documento += "           <tr>\n";
    documento += "               <th>Identificador</th>\n";
    documento += "               <th>Tipo</th>\n";
    documento += "               <th>Tipo</th>\n";
    documento += "               <th>linea</th>\n";
    documento += "               <th>Columna</th>\n";
    documento += "           </tr>\n";
    documento += "       </thead>\n";
    documento += "       <tbody>\n";
    var num = 1;
    for (let i = 0; i < tabla.length; i++) {
        var variable = tabla[i];
        documento += "           <tr>\n";
        documento += `                <th><strong>${variable.id.split("$", 1)[0]}</strong></th>\n`;
        documento += `                <th><strong>${variable.tipo}</strong></th>\n`;
        documento += `                <th><strong>${variable.tipo2}</strong></th>\n`;
        documento += `                <th><strong>${variable.line}</strong></th>\n`;
        documento += `                <th><strong>${variable.column}</strong></th>\n`;
        documento += "           </tr>\n";
        num += 1;
    }
    documento += "       </tbody>\n";
    documento += "   </table>\n";
    documento += "</body>\n</html>\n";
    return documento;
}
