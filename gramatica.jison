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
"List"          return 'LIST'
"New"           return 'TNEW'
"True"          return 'TRUE'
"False"         return 'FALSE'

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

/* SI */
[0-9]+\b				return 'ENTERO';
// ^[0-9]+([.][0-9]+)?$	return 'DECIMAL';
([a-zA-Z])[a-zA-Z0-9_]*	return 'ID';
\"[^\"]*\"              return 'CADENA';
(\'[^☼]\')            	return 'CARACTER';


<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

%left   'OR'
%left   'AND'
%right  'NOT'
%left   'IGUALA','DIFERENTED','MENORQ','MENORIGUALQ','MAYORA', 'MAYORIGUALQ'
%left   'MAS', 'MENOS'
%left   'POR', 'DIVIDIDO', 'POT', 'MOD'
%left    UMENOS, 'ENTERO'

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
	:asignacion
;

asignacion
	:TINT ID PTCOMA{console.log('declaración de variable tipo INT-> ' + $2);}
	|TINT ID ASIGNAR ENTERO PTCOMA{console.log('declaración de variable tipo INT -> ' + $2 + ', VALOR: ' + $4);}
	|TDOUBLE ID PTCOMA{console.log('declaración de variable tipo DOUBLE-> ' + $2);}
	|TDOUBLE ID ASIGNAR numeroD PTCOMA{console.log('declaración de variable tipo DECIMAL -> ' + $2 + ', VALOR: ' + $4);}
	|TBOOLEAN ID PTCOMA{console.log('declaración de variable tipo BOOLEAN-> ' + $2);}
	|TBOOLEAN ID ASIGNAR TRUE PTCOMA{console.log('declaración de variable tipo BOOLEAN -> ' + $2 + ', VALOR: ' + $4);}
	|TBOOLEAN ID ASIGNAR FALSE PTCOMA{console.log('declaración de variable tipo BOOLEAN -> ' + $2 + ', VALOR: ' + $4);}
	|TCHAR ID PTCOMA{console.log('declaración de variable tipo CHAR-> ' + $2);}
	|TCHAR ID ASIGNAR CARACTER PTCOMA{console.log('declaración de variable tipo CARACTER -> ' + $2 + ', VALOR: ' + $4);}
	|TSTRING ID PTCOMA{console.log('declaración de variable tipo STRING-> ' + $2);}
	|TSTRING ID ASIGNAR CADENA PTCOMA{console.log('declaración de variable tipo STRING -> ' + $2 + ', VALOR: ' + $4);}
;

numeroD
	:ENTERO PUNTO ENTERO {$$ = $1+$2+$3;}
	|ENTERO
;



tipos
	:TINT
	|TDOUBLE
	|TBOOLEAN
	|TCHAR
	|TSTRING
;


















