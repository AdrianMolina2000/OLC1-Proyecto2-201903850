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

/* SI */
[0-9]+("."[0-9]+)?  	return 'NUMERO';
([a-zA-Z])[a-zA-Z0-9_]*	return 'ID';
\"[^"]*\"              return 'CADENA';
(\'[^']\')            	return 'CARACTER';


<<EOF>>                 return 'EOF';

.                       { console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column); }
/lex

%left   'OR', 'INTERROGACION', 'ID', 'tipos'
%left   'AND'
%right  'NOT'
%left   'IGUALA','DIFERENTED','MENORQ','MENORIGUALQ','MAYORA', 'MAYORIGUALQ'
%left   'MAS', 'MENOS'
%left   'POR', 'DIVIDIDO', 'POT', 'MOD'
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
;


declaracionVar
	:tipos ID PTCOMA {console.log('declaración de variable tipo -> ' + $1);}
	|tipos ID ASIGNAR expresion PTCOMA {console.log('declaración de variable tipo -> ' + $1 + ', Con valor: ' + $4);}
    |ID ASIGNAR expresion PTCOMA {console.log('declaración de variable Con valor: ' + $3);}
    |tipos CORIZQ CORDER ID ASIGNAR TNEW tipos CORIZQ NUMERO CORDER PTCOMA{console.log('declaración de arreglo tipo -> ' + $1 + ', Con ' + $9 + ' posiciones');}
    |tipos CORIZQ CORDER ID ASIGNAR LLAIZQ listaValores LLADER PTCOMA{console.log('declaración de arreglo tipo -> ' + $1 + ', con valores: ' + $7 );}
    |ID CORIZQ NUMERO CORDER ASIGNAR expresion PTCOMA{console.log('Asignar: ' + $6 + ', a la posicion: ' + $3 );}
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
    |NUMERO                        
    |TRUE			   
    |FALSE				    
    |CADENA		    
    |CARACTER
    |ID CORIZQ NUMERO CORDER           
    |PARIZQ expresion PARDER			{$$ = $1+$2+$3;}	
    |PARIZQ tipos PARDER expresion  	{$$ = $1+$2+$3+$4;}	
	|ID MAS MAS 						{$$ = $1+$2+$3;}
	|ID MENOS MENOS 					{$$ = $1+$2+$3;}
    |ID				
	|expresion INTERROGACION expresion DPUNTOS expresion {$$ = $1+$2+$3+$4+$5;}
;

listaValores
    :listaValores COMA expresion {$$ = $1+$2+$3;}
    |expresion
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


















