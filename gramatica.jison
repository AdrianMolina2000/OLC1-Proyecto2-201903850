/* Definición Léxica */
%lex

%options case-insensitive

%%

/* Espacios en blanco */
\s+					{}
[ \t\r\n\f]         {}
\n                  {}
"/""/".*            {}
[/][*][^*/]*[*][/]  {}

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
"+"             return 'MAS'
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
[0-9]+("."[0-9]+)?  	return 'NUMERO';
([a-zA-Z])[a-zA-Z0-9_]*	return 'ID';
\"[^"]*\"               return 'CADENA';
(\'[^']\')            	return 'CARACTER';


<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

%left   'OR', 'INTERROGACION', 'tipos'
%left   'AND'
%right  'NOT'
%left   'IGUALA','DIFERENTED','MENORQ','MENORIGUALQ','MAYORA', 'MAYORIGUALQ'
%left   'MAS', 'MENOS'
%left   'POR', 'DIVIDIDO', 'POT', 'MOD', 'ID'
%left    UMENOS

%start ini 

%%

ini
	: instrucciones EOF
;

instrucciones
	: instruccion instrucciones
	| instruccion
	| error { console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this._$.first_line + ', en la columna: ' + this._$.first_column); }
;

instruccion
	:declaracionVar
    |funciones
    |metodos
    |llamada
    |sentencia_if
    |sentencia_switch
    |sentencia_while
    |sentencia_for
    |sentencia_dowhile
    |sentencia_print
    |increment_decrement PTCOMA
    |BREAK PTCOMA
    |CONTINUE PTCOMA
    |sentencia_return
    |exe

;

exe
    :EXEC ID PARIZQ PARDER PTCOMA {console.log('se ejecuta {' + $2 + '}');}
    |EXEC ID PARIZQ listaValores PARDER PTCOMA {console.log('se ejecuta {' + $2 + '} con parametros {'+$4+'}');}
;

metodos
    :VOID ID PARIZQ parametros PARDER LLAIZQ instrucciones LLADER{console.log('metodo llamada {'+$2+'} con parametros{'+$4+'}');}
;

funciones
    :tipos ID PARIZQ parametros PARDER LLAIZQ instrucciones LLADER{console.log('funcion llamada {'+$2+'} del tipo {' +$1+'} con parametros{'+$4+'}');}
;

llamada
    :llamar PTCOMA
;

llamar
    :ID PARIZQ parametros_llamada PARDER {$$ = $1+$2+$3+$4}
    |ID PARIZQ PARDER  {$$ = $1+$2+$3}
;

parametros_llamada
    :parametros_llamada COMA expresion {$$ = $1+' '+$2+' '+$3}
    |expresion
;
parametros
    :parametros COMA tipos ID   {$$ = $1+' '+$2+' '+$3+' '+$4}
    |tipos ID                   {$$ = $1+' '+$2}
    |                           {$$ = 'Sin parametros'}
;

sentencia_if
    :IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER {console.log('IF');}
    |IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER ELSE LLAIZQ instruccion LLADER {console.log('IF ELSE');}
    |IF PARIZQ expresion PARDER LLAIZQ instrucciones LLADER ELSE sentencia_if {console.log('ELIF');}
;

sentencia_switch
    :SWITCH PARIZQ expresion PARDER LLAIZQ caseList defaultList LLADER {console.log('SWITCH');}
    |SWITCH PARIZQ expresion PARDER LLAIZQ caseList LLADER {console.log('SWITCH');}
    |SWITCH PARIZQ expresion PARDER LLAIZQ defaultList LLADER {console.log('SWITCH');}
;

caseList
    :caseList CASE expresion DPUNTOS instrucciones 
    |CASE expresion DPUNTOS instrucciones {console.log('CASE');}
;

defaultList
    :DEFAULT DPUNTOS instrucciones {console.log('DEFAULT');}
;

sentencia_while
    :WHILE PARIZQ expresion PARDER LLAIZQ instrucciones LLADER {console.log('WHILE');}
;

sentencia_dowhile
    :DO LLAIZQ instrucciones LLADER WHILE PARIZQ expresion PARDER PTCOMA {console.log('DO WHILE');}
;

sentencia_for
    :FOR PARIZQ forVar PTCOMA expresion PTCOMA for_increment PARDER LLAIZQ instrucciones LLADER {console.log('FOR');}
;

forVar
    :iD ASIGNAR expresion{console.log('se asigna {' + $3 + '} a la variable {' +$1+ '}');}
    |TINT ID ASIGNAR NUMERO{console.log('se declaró la variable {' + $2 + '} del tipo {int} con valor: '+ $4);}
;

for_increment
    :increment_decrement {console.log('se incrementa: ' + $1);}
    |ID ASIGNAR expresion {console.log('se incrementa: ' + $3);}
;

sentencia_print
    :PRINT PARIZQ expresion PARDER PTCOMA{console.log('Se imprime: ' + $3);}
;

sentencia_return
    :RETURN expresion PTCOMA{console.log('return: ' + $2);}
;

declaracionVar
	:tipos ID PTCOMA {console.log('se declaró la variable {' + $2 + '} del tipo {' + $1 + '}');}
	|tipos ID ASIGNAR expresion PTCOMA {console.log('se declaró la variable {' + $2 + '} del tipo {' + $1 + '} con valor: '+ $4);}
    |ID ASIGNAR expresion PTCOMA {console.log('Se asigno {' + $3 + '} a la variable {' + $1 + '}');}
    |tipos CORIZQ CORDER ID ASIGNAR TNEW tipos CORIZQ NUMERO CORDER PTCOMA{console.log('declaración de arreglo {' + $4 + '} de tipo {'+ $1 + '} de {' + $9 + '} posiciones');}
    |tipos CORIZQ CORDER ID ASIGNAR LLAIZQ listaValores LLADER PTCOMA{console.log('declaración de arreglo {' + $4 + '} de tipo {'+ $1 + '} con valores {' + $7 + '}');}
    |ID CORIZQ NUMERO CORDER ASIGNAR expresion PTCOMA{console.log('Asignar {' + $6 + '} a la posicion {' + $3 + '} del arreglo {'+$1+'}');}
    |LIST MENORQ tipos MAYORA ID ASIGNAR NEW LIST MENORQ tipos MAYORA PTCOMA{console.log('declaración de lista {' + $5 + '} del tipo {' + $3 + '}');}
    |LIST MENORQ tipos MAYORA ID ASIGNAR tocha PTCOMA{console.log('declaración de lista {' + $5 + '} del tipo {' + $7 + '}');}
    |ID PUNTO ADD PARIZQ expresion PARDER PTCOMA{console.log('agregar a lista {' + $1 + '} el valor {' + $5 + '}');}
    |ID CORIZQ CORIZQ NUMERO CORDER CORDER ASIGNAR expresion PTCOMA{console.log('Asignar {' + $8 + '} a la posicion {' + $4 + '} de la lista {'+$1+'}');}
;

expresion 
	:MENOS expresion %prec UMENOS	 	{$$ = $1+$2;}		
    |NOT expresion	               		{$$ = $1+$2;}	
    |expresion MAS expresion      		{$$ = $1+$2+$3;}	
    |expresion MENOS expresion      	{$$ = $1+$2+$3;}		
    |expresion POR expresion      		{$$ = $1+$2+$3;}	
    |expresion DIVIDIDO expresion		{$$ = $1+$2+$3;}	
    |expresion MOD expresion			{$$ = $1+$2+$3;}
    |expresion POT expresion			{$$ = $1+$2+$3;}
	|expresion MENORQ expresion	 		{$$ = $1+$2+$3;}	
    |expresion MAYORA expresion         {$$ = $1+$2+$3;}			
    |expresion MAYORIGUALQ expresion	{$$ = $1+$2+$3;}			  
    |expresion MENORIGUALQ expresion	{$$ = $1+$2+$3;}			   
    |expresion IGUALA expresion	  		{$$ = $1+$2+$3;}			
    |expresion DIFERENTED expresion	   	{$$ = $1+$2+$3;}
    |expresion OR expresion	  			{$$ = $1+$2+$3;}
    |expresion AND expresion			{$$ = $1+$2+$3;}
    |ID				    
    |NUMERO                        
    |TRUE			   
    |FALSE				    
    |CADENA		    
    |CARACTER
    |ID CORIZQ CORIZQ NUMERO CORDER CORDER  {$$ = $1+$2+$3+$4+$5+$6;}	
    |ID CORIZQ NUMERO CORDER                {$$ = $1+$2+$3+$4;}	
    |PARIZQ expresion PARDER			    {$$ = $1+$2+$3;}	
    |PARIZQ tipos PARDER expresion  	    {$$ = $1+$2+$3+$4;}	
    |increment_decrement
	|expresion INTERROGACION expresion DPUNTOS expresion {$$ = $1+$2+$3+$4+$5;}
    |llamar
    |TOLOWER PARIZQ expresion PARDER {$$ = $1+$2+$3+$4;}
    |TOUPPER PARIZQ expresion PARDER {$$ = $1+$2+$3+$4;}
    |LENGTH PARIZQ expresion PARDER {$$ = $1+$2+$3+$4;}
    |TRUNCATE PARIZQ expresion PARDER {$$ = $1+$2+$3+$4;}
    |ROUND PARIZQ expresion PARDER {$$ = $1+$2+$3+$4;}
    |TYPEOF PARIZQ expresion PARDER {$$ = $1+$2+$3+$4;}
    |TOSTRING PARIZQ expresion PARDER {$$ = $1+$2+$3+$4;}
;


increment_decrement
	:ID MAS MAS 						    {$$ = $1+$2+$3;}
	|ID MENOS MENOS 					    {$$ = $1+$2+$3;}
;

listaValores
    :listaValores COMA expresion {$$ = $1+$2+$3;}
    |expresion
;

tocha
    :TOCHARARRAY PARIZQ expresion PARDER  {$$ = $1+$2+$3+$4;}
;

// numeroD
// 	:ENTERO PUNTO ENTERO {$$ = $1+$2+$3;}
// 	|ENTERO
// ;

tipos
	:TINT
	|TDOUBLE
	|TBOOLEAN
	|TCHAR
	|TSTRING
;


















