/* Definición Léxica */
%lex

%options case-insensitive

%%

/* Espacios en blanco */
\s+					{}
[ \r\t]+            {}
\n                  {}
"/""/".*            {}
[/][*][^*/]*[*][/]  {}


/* TIPOS */
"Int"           return 'TENTERO'
"Double"        return 'TDECIMAL'
"Boolean"       return 'TBOLEANO'
"Char"          return 'TCARACTER'
"String"        return 'TSTRING'
"List"          return 'LIST'
"New"           return 'NEW'

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
([a-zA-Z])[a-zA-Z0-9_]*	return 'ID';
\"[^\"]*\"              return 'CADENA';
(\'[^☼]\')            	return 'CARACTER';
[0-9]+\b              	return 'ENTERO';
[0-9]+("."[0-9]+)?\b    return 'DECIMAL';

<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

%left   'OR'
%left   'AND'
%right  'NOT'
%left   'IGUALA','DIFERENTED','MENORQ','MENORIGUALQ','MAYORA', 'MAYORIGUALQ'
%left   'MAS', 'MENOS'
%left   'POR', 'DIVIDIDO', 'POT', 'MOD'
%left   UMENOS

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
	:TSTRING ID PTCOMA{console.log('nombramiento ' + $2);}
;
