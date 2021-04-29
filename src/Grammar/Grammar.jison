
%{
    let txt = "";
    //Tipos
    const {Tree} = require('../Simbols/Tree');
    const {Tipo, tipos, esEntero} = require('../other/tipo');
    const {Primitivo} = require('../Expresiones/Primitivo');
    const {Excepcion} = require('../other/Excepcion');
    const {Identificador} = require('../Expresiones/Identificador');
    //Instrucciones
    const {Print} = require('../Instrucciones/Print');
    const {Declaracion, defal} = require('../Instrucciones/Declaracion');
    const {Asignacion} = require('../Instrucciones/Asignacion');
    const {If} = require('../Instrucciones/If');
    const {Switch} = require('../Instrucciones/Switch');
    const {Case} = require('../Instrucciones/Case');
    const {While} = require('../Instrucciones/While');
    const {DoWhile} = require('../Instrucciones/DoWhile');
    const {For} = require('../Instrucciones/For');
    const {Continue} = require('../Expresiones/Continue');
    const {Break} = require('../Expresiones/Break');
    //Expresion
    const {Aritmetica} = require('../Expresiones/Aritmetica');
    const {Relacional} = require('../Expresiones/Relacional');
    const {Logico} = require('../Expresiones/Logico');
    const {Ternario} = require('../Expresiones/Ternario');
    const {Casteo} = require('../Expresiones/Casteo');
    const {InDecrement} = require('../Expresiones/InDecrement');


%}
/* Definición Léxica */
%lex

%options case-insensitive
%x CADENA
%%

/* Espacios en blanco */
\s+					{}
[ \t\r\n\f]         {}
\n                  {}
"/""/".*            {}
[/][*][^*/]*[*][/]  {}

["]                 {txt=""; this.begin("CADENA");}
<CADENA>[^"\\]+     {txt+=yytext;}
<CADENA>"\\n"       {txt+='\n';}
<CADENA>"\\t"       {txt+='\t';}
<CADENA>"\\\""      {txt+='\"';}
<CADENA>"\\\'"      {txt+='\'';}
<CADENA>"\\\\"      {txt+='\\';}
<CADENA>["]         {yytext = txt; this.popState(); return 'CADENA';}


/* TIPOS */
"Int"           return 'TINT'
"Double"        return 'TDOUBLE'
"Boolean"       return 'TBOOLEAN'
"Char"          return 'TCHAR'
"String"        return 'TSTRING'
"True"          return 'TRUE'
"False"         return 'FALSE'
"List"          return 'LIST'
"New"           return 'NEW'
"Add"           return 'ADD'

/* OPERADORES ARITMETICOS */
"++"            return 'INC'
"+"             return 'MAS'
"--"            return 'DEC'
"-"             return 'MENOS'
"*"             return 'POR'
"/"             return 'DIVIDIDO'
"^"             return 'POT'
"%"             return 'MOD'

/* OPERADORES RELACIONALES */
"=="            return 'IGUALA'
"!="            return 'DIFERENTED'
"<="            return 'MENORIGUALQ'
"<"             return 'MENORQ'
">="            return 'MAYORIGUALQ'
">"             return 'MAYORA'

/* OTROS */
"="             return 'ASIGNAR'
"?"             return 'INTERROGACION'
":"             return 'DPUNTOS'
";"             return 'PTCOMA';
"."				return 'PUNTO';
","             return 'COMA';

/* OPERADORES LOGICOS */
"||"            return 'OR'
"&&"            return 'AND'
"!"             return 'NOT'

/* AGRUPACION */
"("             return 'PARIZQ'
")"             return 'PARDER'
"{"             return 'LLAIZQ'
"}"             return 'LLADER'
"["             return 'CORIZQ'
"]"             return 'CORDER'

/* SENTENCIAS */
"if"            return 'IF'
"else"          return 'ELSE'
"switch"        return 'SWITCH'
"case"          return 'CASE'
"default"       return 'DEFAULT'
"Break"         return 'BREAK'
"while"         return 'WHILE'
"do"            return 'DO'
"print"         return 'PRINT'
"for"           return 'FOR'
"continue"      return 'CONTINUE'
"return"        return 'RETURN'
"void"          return 'VOID'
"toLower"       return 'TOLOWER'
"toUpper"       return 'TOUPPER'
"length"        return 'LENGTH'
"truncate"      return 'TRUNCATE'
"round"         return 'ROUND'
"typeof"        return 'TYPEOF'
"tostring"      return 'TOSTRING'
"tochararray"   return 'TOCHARARRAY'
"exec"   return 'EXEC'


/* SI */
[0-9]+("."[0-9]+)?\b  	return 'DECIMAL';
[0-9]+\b 	            return 'ENTERO';
([a-zA-Z])[a-zA-Z0-9_]*	return 'ID';
// (\"[^"]*\")             return 'CADENA';
(\'[^']?\')            	return 'CARACTER';


<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

//PRECEDENCIA
%left   'OR', 'INTERROGACION', 'tipos'
%left   'AND',
%right  'NOT'
%left   'IGUALA','DIFERENTED','MENORQ','MENORIGUALQ','MAYORA', 'MAYORIGUALQ'
%left   'INC', 'MAS',  'DEC', 'MENOS'
%left   'POR', 'DIVIDIDO', 'POT', 'MOD', 'ID'
%left    UMENOS

%start ini 

%%

ini
	: instrucciones EOF             {$$ = new Tree($1); return $$;}
;

instrucciones
	:instrucciones instruccion      {$$ = $1; $1.push($2);}
	|instruccion                    {$$=[$1];}
;

instruccion
	:declaracionVar                 {$$ = $1;}       
    |funciones
    |metodos
    |llamada
    |sentencia_if                   {$$ = $1;}
    |sentencia_switch
    |sentencia_while                {$$ = $1;}
    |sentencia_for                  {$$ = $1;}
    |sentencia_dowhile              
    |sentencia_print                {$$ = $1;}
    |ID INC PTCOMA 	                {$$ = new InDecrement($1, "++", @1.first_line, @1.first_column);}					    
	|ID DEC PTCOMA 	                {$$ = new InDecrement($1, "--", @1.first_line, @1.first_column);}
    |CONTINUE PTCOMA                {$$ = new Continue(@1.first_line, @1.first_column)}
    |BREAK PTCOMA                   {$$ = new Break(@1.first_line, @1.first_column)}
    |sentencia_return
    |exe
;

exe
    :EXEC ID PARIZQ PARDER PTCOMA
    |EXEC ID PARIZQ listaValores PARDER PTCOMA 
;

metodos
    :VOID ID PARIZQ parametros PARDER LLAIZQ instrucciones LLADER
;

funciones
    :tipos ID PARIZQ parametros PARDER LLAIZQ instrucciones LLADER
;

llamada
    :llamar PTCOMA
;

llamar
    :ID PARIZQ parametros_llamada PARDER
    |ID PARIZQ PARDER  
;

parametros_llamada
    :parametros_llamada COMA expresion 
    |expresion
;
parametros
    :parametros COMA tipos ID   
    |tipos ID                   
;

sentencia_if
    :IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER {$$ = new If($3, $6, [], @1.first_line, @1.first_column);}
    |IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER ELSE LLAIZQ instrucciones LLADER {$$ = new If($3, $6, $10, @1.first_line, @1.first_column);}
    |IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER ELSE sentencia_if {$$ = new If($3, $6, [$9], @1.first_line, @1.first_column);}
;

sentencia_switch
    :SWITCH PARIZQ expresion PARDER LLAIZQ caseList defaultList LLADER  {$$ = new Switch($3, $6, $7, @1.first_line, @1.first_column);}
    |SWITCH PARIZQ expresion PARDER LLAIZQ caseList LLADER              {$$ = new Switch($3, $6, null, @1.first_line, @1.first_column);}
    |SWITCH PARIZQ expresion PARDER LLAIZQ defaultList LLADER           {$$ = new Switch($3, null, $6, @1.first_line, @1.first_column);}
;

caseList
    :caseList CASE expresion DPUNTOS instrucciones    {$$ = $1; $$.push(new Case($3, $5, @1.first_line, @1.first_column));}
    |CASE expresion DPUNTOS instrucciones             {$$ = []; $$.push(new Case($2, $4, @1.first_line, @1.first_column));}
;

defaultList
    :DEFAULT DPUNTOS instrucciones {$$ = $3}
;

sentencia_while
    :WHILE PARIZQ expresion PARDER LLAIZQ instrucciones LLADER {$$ = new While($3, $6, @1.first_line, @1.first_column);}
;

sentencia_dowhile
    :DO LLAIZQ instrucciones LLADER WHILE PARIZQ expresion PARDER PTCOMA  {$$ = new DoWhile($7, $3, @1.first_line, @1.first_column);}
;

sentencia_for
    :FOR PARIZQ forVar PTCOMA expresion PTCOMA for_increment PARDER LLAIZQ instrucciones LLADER {$$ = new For($3, $5, $7, $10, @1.first_line, @1.first_column);}
;

forVar
    :tipos ID ASIGNAR expresion {$$ = new Declaracion($1, $2, $4, @1.first_line, @1.first_column);}
    |ID ASIGNAR expresion       {$$ = new Asignacion($1, $3, @1.first_line, @1.first_column);}
;

for_increment
    :ID INC 	                {$$ = new InDecrement($1, "++", @1.first_line, @1.first_column);}					    
	|ID DEC 	                {$$ = new InDecrement($1, "--", @1.first_line, @1.first_column);}	 
    |ID ASIGNAR expresion       {$$ = new Asignacion($1, $3, @1.first_line, @1.first_column);}
;

sentencia_print
    :PRINT PARIZQ expresion PARDER PTCOMA           { $$ = new Print($3, @1.first_line, @1.first_column);}
;

sentencia_return
    :RETURN expresion PTCOMA
;

declaracionVar
	:tipos ID PTCOMA                        {$$ = new Declaracion($1, $2, defal($1), @1.first_line, @1.first_column);}
	|tipos ID ASIGNAR expresion PTCOMA      {$$ = new Declaracion($1, $2, $4, @1.first_line, @1.first_column);}
    |ID ASIGNAR expresion PTCOMA            {$$ = new Asignacion($1, $3, @1.first_line, @1.first_column);}
    |tipos CORIZQ CORDER ID ASIGNAR TNEW tipos CORIZQ ENTERO CORDER PTCOMA
    |tipos CORIZQ CORDER ID ASIGNAR LLAIZQ listaValores LLADER PTCOMA
    |ID CORIZQ ENTERO CORDER ASIGNAR expresion PTCOMA
    |LIST MENORQ tipos MAYORA ID ASIGNAR NEW LIST MENORQ tipos MAYORA PTCOMA
    |LIST MENORQ tipos MAYORA ID ASIGNAR tocha PTCOMA
    |ID PUNTO ADD PARIZQ expresion PARDER PTCOMA
    |ID CORIZQ CORIZQ ENTERO CORDER CORDER ASIGNAR expresion PTCOMA
;

expresion 
	:MENOS expresion %prec UMENOS	 	                    {$$ = new Aritmetica(null, $2, '-', @1.first_line, @1.first_column);}	
    |NOT expresion	               		                    {$$ = new Logico(null, $2, '!', @1.first_line, @1.first_column);}	
    |ID INC 	                                            {$$ = new InDecrement($1, "++", @1.first_line, @1.first_column);}					    
    |expresion MAS expresion      		                    {$$ = new Aritmetica($1, $3, '+', @1.first_line, @1.first_column);}	
	|ID DEC 					                            {$$ = new InDecrement($1, "--", @1.first_line, @1.first_column);}	
    |expresion MENOS expresion      	                    {$$ = new Aritmetica($1, $3, '-', @1.first_line, @1.first_column);}		
    |expresion POR expresion      		                    {$$ = new Aritmetica($1, $3, '*', @1.first_line, @1.first_column);}		
    |expresion DIVIDIDO expresion		                    {$$ = new Aritmetica($1, $3, '/', @1.first_line, @1.first_column);}		
    |expresion MOD expresion			                    {$$ = new Aritmetica($1, $3, '%', @1.first_line, @1.first_column);}	
    |expresion POT expresion			                    {$$ = new Aritmetica($1, $3, '^', @1.first_line, @1.first_column);}	
    |expresion MENORIGUALQ expresion	                    {$$ = new Relacional($1, $3, '<=', @1.first_line, @1.first_column);}			   
	|expresion MENORQ expresion	 		                    {$$ = new Relacional($1, $3, '<', @1.first_line, @1.first_column);}	
    |expresion MAYORIGUALQ expresion	                    {$$ = new Relacional($1, $3, '>=', @1.first_line, @1.first_column);}			  
    |expresion MAYORA expresion                             {$$ = new Relacional($1, $3, '>', @1.first_line, @1.first_column);}			
    |expresion IGUALA expresion	  		                    {$$ = new Relacional($1, $3, '==', @1.first_line, @1.first_column);}			
    |expresion DIFERENTED expresion	   	                    {$$ = new Relacional($1, $3, '!=', @1.first_line, @1.first_column);}
    |expresion OR expresion	  			                    {$$ = new Logico($1, $3, '||', @1.first_line, @1.first_column);}
    |expresion AND expresion			                    {$$ = new Logico($1, $3, '&&', @1.first_line, @1.first_column);}
    |ID                                                     {$$ = new Identificador($1, @1.first_line, @1.first_column); }				                    
//  |ENTERO                                                 {$$ = new Primitivo(new Tipo(tipos.ENTERO), Number($1), _$.first_line, _$.first_column);}                                                 
    |DECIMAL                                                {$$ = new Primitivo(new Tipo(esEntero(Number($1))), Number($1), @1.first_line, @1.first_column);}                                                  
    |TRUE			                                        {$$ = new Primitivo(new Tipo(tipos.BOOLEANO), true, @1.first_line, @1.first_column);} 
    |FALSE				                                    {$$ = new Primitivo(new Tipo(tipos.BOOLEANO), false, @1.first_line, @1.first_column);}
    |CADENA		                                            {$$ = new Primitivo(new Tipo(tipos.STRING), $1, @1.first_line, @1.first_column);} 
    |CARACTER                                               {$$ = new Primitivo(new Tipo(tipos.CARACTER), $1.replace(/\'/g,""), @1.first_line, @1.first_column);} 
    |ID CORIZQ CORIZQ ENTERO CORDER CORDER  	
    |ID CORIZQ ENTERO CORDER                	
    |PARIZQ expresion PARDER			                    {$$ = $2;}   	
    |PARIZQ tipos PARDER expresion                          {$$ = new Casteo($2, $4, @1.first_line, @1.first_column);}  	    	
	|expresion INTERROGACION expresion DPUNTOS expresion    {$$ = new Ternario($1, $3, $5, @1.first_line, @1.first_column);}
    |llamar
    |TOLOWER PARIZQ expresion PARDER        
    |TOUPPER PARIZQ expresion PARDER        
    |LENGTH PARIZQ expresion PARDER         
    |TRUNCATE PARIZQ expresion PARDER       
    |ROUND PARIZQ expresion PARDER          
    |TYPEOF PARIZQ expresion PARDER         
    |TOSTRING PARIZQ expresion PARDER   
;


// increment_decrement
	// :ID MAS MAS 	                                         {$$ = new InDecrement($1, "++", @1.first_line, @1.first_column);}					    
	// |ID MAS MAS 	                                         {$$ = new InDecrement($1, "++", @1.first_line, @1.first_column);}					    
	// |ID MENOS MENOS 					                     {$$ = new InDecrement($1, "--", @1.first_line, @1.first_column);}
// ;

listaValores
    :listaValores COMA expresion
    |expresion
;

tocha
    :TOCHARARRAY PARIZQ expresion PARDER  
;

// numeroD
// 	:ENTERO PUNTO ENTERO {$$ = $1+$2+$3;}
// 	|ENTERO
// ;

tipos
	:TINT           {$$ = new Tipo(tipos.ENTERO);}
	|TDOUBLE        {$$ = new Tipo(tipos.DECIMAL);}
	|TBOOLEAN       {$$ = new Tipo(tipos.BOOLEANO);}
	|TCHAR          {$$ = new Tipo(tipos.CARACTER);}
	|TSTRING        {$$ = new Tipo(tipos.STRING);}
;