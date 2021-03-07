# Práctica 3: Tipos de datos estáticos y funciones. Informe.
## Desarrollo de Sistemas Informáticos 
## Raúl Martín Rigor - alu0101203003@ull.edu.es

### Introducción

En este informe se resumen las actividades realizadas en la **práctica 3** para poner en práctica nuestros conocimientos de TypeScript sobre cadenas de texto (*string*) a través de la implementación de distintas funciones en una serie de ejercicios.

### Objetivos

Al finalizar la práctica, habremos completado los siguientes objetivos:

* Adquirir conocimientos sobre manejo, operacion y manipulación de *strings* en TypeScript
* Saber operar con digitos extraidos de una cadena de texto
* Manejar y hacer uso de expresiones regulares como patron de búsqueda/reemplazo
* Usar funciones anonimas para reducir el número de líneas de código de nuestro programa

### 1. Creación y configuración del driectorio del proyecto.

#### 1.1. Estructura inicial

Con el fin de preparar una estructura adecuada para nuestro proyecto seguiremos la [Guía de creación de un proyecto inicial](https://ull-esit-inf-dsi-2021.github.io/typescript-theory/typescript-project-setup.html).

Si hemos seguido los pasos correctamente acabaremos con una estructura como la siguiente:

<img src="img/Captura1a.JPG" alt="" height="250"/> <img src="img/Captura1b.JPG" alt="" height="250"/> <img src="img/Captura1c.JPG" alt="" height="250"/>

En resumidas cuentas tendremos el directorio src donde se almacena el código fuente de cada ejercicio que realizaremos y el directorio dist contendrá el código resultante de compilarlos que será ejecutado. Además se encuentran todos los archivos de congiguración (para más detalle sobre el contenido de cada uno se recomienda consultar la [guía](https://ull-esit-inf-dsi-2021.github.io/typescript-theory/typescript-project-setup.html).

Crearemos tambien un fichero *.gitignore* y modificaremos el *.eslintcr.json* añadiéndole dos reglas que nos ignoren los errores propios de JavaScript ya que trabajaremos en TypeScript.

#### 1.2 Metodolgía de trabajo

La manera en la que trabajaremos será mediante el desarrollo de ejercicios en los que implementaremos funciones que nos permitan resolver los problemas planteados.

Para probar el funcionamiento de los ejercicios cambiaremos la propiedad start del fichero package.json y pondremos el nombre del ejercicio a probar. Ejecutaremos `npm start`:

<img src="img/Captura2.JPG" alt=""/> 


### 2. Ejercicios

Paso a explicar la resolución de cada ejercicio y a adjuntar su código y salida. Se mostrará una versión simplificada de los enunciados de los ejercicios (para verlos al completo con aclaraciones y pistas, consultar la [guía de la práctica](https://ull-esit-inf-dsi-2021.github.io/prct03-types-functions/)

#### 1.1 Ejercicio 1

**Enunciado:**

Cree una función isLeapYear que devuelva si un año concreto es bisiesto o no. La función deberá recibir como parámetro el año a evaluar y devolverá verdadero o falso según corresponda.Tenga en cuenta que un año bisiesto ocurre en el calendario gregoriano:

* Cada año que es divisible por 4.
* Excepto cada año que es divisible por 100. 
* Al menos que el año también sea divisible por 400.

**Resolución:**

Tal y como está planteado el problema, existe dos casos en los que un año es bisiesto:

* Es divisible por 4 y no lo es por 100
* Es divisible por 100 pero también lo es por 4 y 400

Por lo tanto, si cumple una de las 2 condiciones devolverá true y si no false

```ts
function isLeapYear (year : number) {
    if(((year%4 == 0) && (year%100 != 0)) || ((year%4 == 0) && (year%100 == 0)&&(year%400 == 0))) {
       return true;
    }else {
        return false;
    }

}

console.log(isLeapYear(1997)); //false
console.log(isLeapYear(1996)); //true
```


#### 1.2 Ejercicio 2

**Enunciado:**

Codificar números decimales con factoriales es una forma de escribir números en un sistema base que depende de factoriales, en lugar de potencias.En este sistema, el último dígito siempre es 0 y está en base 0!. El dígito anterior pueder ser 0 o 1 y está en base 1!. Del mismo modo, el dígito anterior es 0, 1 o 2 y está en base 2!. De manera más general, el enésimo dígito respecto al último es siempre 0, 1, 2, ..., n y está en base n!.

Para resolver este ejercicio, defina dos funciones decimalToFactorial y factorialToDecimal. La primera, recibirá un entero positivo y devolverá como resultado una cadena de texto con la representación factorial del número recibido. Por el contrario, la función factorialToDecimal realizará la operación opuesta. Esto es, recibirá como paŕametro una cadena de texto en notación factorial y devolverá el número entero que representa.

**Resolución:**

Primero es necesario implementar una función `function factorial (n :number)` que nos permitirá sacar el factorial de un número. Nos será de utilidad para las dos funciones principales:

```ts

function factorial (n :number) { 
	if (n == 0){ 
		return 1; 
	}
	return n * factorial (n-1); 
}
```
Para pasar de decimal a factorial seguiremos un determinado protocolo:
* Buscaremos el factorial de mayor tamaño que, multiplicado por un entero, representa al numero de entrada sin pasarse
* Una vez encontrado el que se pasa del valor, le restamos uno para obtener el anterior ( `max_factorial--`)
* Buscamos ahora el entero por el que hay que multiplicarlo para acercarnos lo máximo posible y conservamos el resto para repetirle este proceso hasta que lleguemos al ultimo factorial de la base (0!)
```ts
function decimalToFactorial (n :number) {
    var codificado = "";
    var i :number = 0;
    var max_factorial :number = 0;
    while (i < 100) {
    max_factorial = i;
    var factorial_base = factorial(i);
        if (factorial_base > n){  //encontrar el factorial mayor que representa a n sin pasarse
            max_factorial--; //como se pasa se resta 1
            break;
        }
        else {
            i++;
        }
    }
    var resto = n;
    for(i = max_factorial; i > 0; i --) {
        var factorial_base = factorial(i); //factorial de la base
        var cociente = Math.floor(resto/factorial_base); //el valor por el que hay que multiplicar el factorial de la base (cociente truncado)
        resto = resto - factorial_base*cociente; //se actualiza el resto para la siguiente operación
        codificado = codificado+cociente; //se añade el valor al resultado
    }
    return codificado;

}
```
Para pasar de factorial a decimal multiplicaremos cada digito por el factorial que le corresponde hasta llegar a 0 (de atrás paraa alante). La suma de todos estos valores será el número en base decimal.

```ts

function factorialToDecimal (s :string) {
var sz: number = s.length;
var j :number = sz;
var num :number = 0;
for (var i :number = 0; i < sz; i++){
    var tmp :number = parseInt(s[i]);
    tmp = tmp * factorial(j);   //se multiplica cada digito por el factorial al que corresponde (j cuenta atrás)
    num = num + tmp;    //sumatorio de todas las multiplicaciones
    j--;
}
return num; //devuleve el numero sumado

}

console.log(decimalToFactorial(463));     //34101
console.log(factorialToDecimal("34101")); //463
```

#### 1.3 Ejercicio 3

**Enunciado:**

Supongamos que recibimos un mensaje en una cadena de texto que sigue un patrón “Xsubcadena1Ysubcadena2” dónde X e Y son números y subcadena1 y subcadena2 son cadenas de texto. Queremos comprobar la validez de un determinado mensaje en función de unas reglas preestablecidas. Para decidir si el mensaje es válido, debemos dividir la cadena de texto en números y subcadenas. Posteriormente, debemos comprobar que para cada número que encontramos, la longitud de la subcadena es igual al número anterior.

Defina una función isValid que reciba como parámetro una cadena de texto compuesta por números y letras y determine si es válida según las reglas anteriores. La función devolverá el resultado del cálculo mediante un valor de tipo booleano.

* Los mensajes solo tienen números y letras.
* Los números pueden tener varios dígitos. Por ejemplo, la cadena “4code10helloworld” es un mensaje válido.
* Cada número debe corresponder con la longitud de la subcadena que se encuentra a continuación, en cualquier otro caso el mensaje no será válido.
* La cadena vacía se considera un mensaje válido.

**Resolución:**

Para determinar si es valida, dividiremos la cadena en bloques que evaluaremos uno a uno hasta el final (`var bloque :string = s.slice(i,s.length);`). Obtendremos el tamaño del bloque de sus primeros 2 digitos (`bloque_sz`). Si un bloque no empieza indicando su longitud, la cadena perderá la validez (`if (isNaN(bloque_sz))`). A el tamaño se le sumará la cantidad de digitos de su tamaño para tenerlos en cuenta a la hora de avanzar en la cadena. 

Se recorrerá cada bloque de principio a fin contando las letras que tiene. Si este contador no coincide con el tamaño indicado del bloque, la cadena perderá la validez.

```ts
function isValid (s :string) {
    if (s == ""){  //si es la cadena vacía
        return true;
    }
    for(var i :number = 0; i < s.length; i++){
        var cont = 0;
        var bloque :string = s.slice(i,s.length);
        var bloque_sz :number = parseInt(bloque);
        if (isNaN(bloque_sz)){ //si el bloque no empieza por un numero que inidique su tamaño
            return false;
        }
        var digito :string = bloque_sz.toString();
        bloque_sz = bloque_sz + digito.length;
        for(var j :number = i+digito.length; j < i + bloque_sz; j++){ //se recorre el bloque de principio a fin (sin los digitos del tamaño)
            var pos :number = parseInt(s[j]);
            if (isNaN(pos) && j < s.length){ // se cuentan las letras
                cont++;
            }
        }
        i = i + bloque_sz - 1;
        if ((bloque_sz - digito.length) != cont){ // si el numero de letras no coincide con el tamaño del bloque: no es valido
            return false;
        }
    }
    return true;
}

console.log(isValid("3hey5hello2hi"));     // true
console.log(isValid("4code10helloworld")); // true
console.log(isValid("4code10heloworld"));  // false
console.log(isValid(""));                  // true
```


#### 1.4 Ejercicio 4

**Enunciado:**

A la hora de desarrollar código, hay diversas maneras de nombrar las variables, funciones, clases y otros elementos que componen el código. Un patrón muy usado en lenguajes de programación como Python es el Snake Case. Este patrón consiste en dividir los nombres de las variables y funciones usando guiones bajos entre palabras. Por ejemplo: sample_string o the_stealth_warrior.

Por el contrario, en lenguajes de programación como Java, C# y C/C++, predomina el denominado Camel Case. En este caso, los nombres de variables, clases y funciones se separan escribiendo con mayúscula la primera letra de la siguiente palabra. Siguiendo los ejemplos anteriores: sampleString o theStealthWarrior.

Desarrolle dos funciones fromSnakeToCamelCase y fromCamelToSnakeCase que conviertan una cadena de texto de un formato a otro. Ambas funciones recibirán como parámetro una cadena de texto y devolverán otra cadena con el nuevo formato. La primera función recibirá una cadena de texto en formato Snake Case y la convertirá a formato Camel Case. La segunda función realizará la operación contraria.

**Resolución:**

Para pasar de snake a camel case seguimos los siguientes pasos:

* Buscamos en la cadena de entrada todos los elementos formados por un guion bajo seguido de una minuscula
* Reemplazamos estos elementos por ellos mismos en mayúsculas (los guiones bajos permanecerán igual)
* Eliminamos los guiones bajos de la cadena
* 
```ts
function fromSnakeToCamelCase (s :string) {
    var result = "";
    var patron :RegExp = /[_][a-z]/g; //todos los elementos formados por un guion bajo seguido de una minuscula
    result = s.replace(patron,grupo => grupo.toUpperCase()); //reemplaza el grupo que coincide con el patron por el propio grupo en mayusculas
    result = result.replace(/[_]/g, ""); //se quitan los guiones bajos
    return result;
}

```
Para pasar de camel a snake case seguimos los siguientes pasos:

* Buscamos en la cadena de entrada todos los elementos seguidos de una mayúscula
* Dividimos la cadena en función de estos elementos y la volvemos a unir añadiendo un guión bajo
* Pasamos toda la cadena a minúsculas

```ts
function fromCamelToSnakeCase (s :string) {
    var result = "";
    var patron :RegExp = /(?=[A-Z])/g; //todos los elementos a los que le sigue una mayuscula
    result = s.split(patron).join("_"); //divide los elementos que cumplen con el patron y los une con guiones bajos
    result = result.toLowerCase(); // se pasa a minusculas
    return result;
}
```

```ts
console.log(fromSnakeToCamelCase("hola_mundo"));  //holaMundo
console.log(fromCamelToSnakeCase("holaMundo"));   //hola_mundo
```



#### 1.5 Ejercicio 5

**Enunciado:**

Chuck Norris es el tío más duro del mundo, una vez golpeó a un caballo en la barbilla y sus descendientes se conocen hoy en día como jirafas.

Como sus puñetazos, Chuck NUNCA necesita más de una línea de código. La tarea que debes realizar, para complacer a Chuck Norris, es crear una función que encadene 4 métodos en una única línea. Puedes utilizar varias líneas, pero no querrás cabrear a Chuck Norris.

Chuck espera como resultado una cadena de caracteres con sus cosas favoritas separadas, ordenadas, unidas de nuevo y, además, que se eliminen todas las apariciones de las letras e y a. Si alguien se atreve a retar a Chuck Norris con una cadena vacía la función devuelve “Broken!”.

Se espera un comportamiento como el siguiente:
* onePunch(‘Beard Jeans Hairbrush Knuckleduster Sand’) => ‘Brd Hirbrush Jns Knuckldustr Snd’
* onePunch(‘Sock Beard Vest Lady Sage’) =>’Brd Ldy Sg Sock Vst’
* onePunch(‘Beard Sack Gun Parachute Face-Kicking-Shoes’) =>’Brd Fc-Kicking-Shos Gun Prchut Sck’
* onePunch(‘Snot Snow Soda Tank Beard’) =>’Brd Snot Snow Sod Tnk’
* onePunch(‘’) =>’Broken!’

**Resolución:**

Para poder implementar la función en una línea necesitaremos usar una función aniónima y un condicional ternario.

* Si la cadena es la vacía se transforma en 'Broken', si no:
* Se divide por espacios
* Se reordena (alfabeticamente)
* Se vuelve a unir por espacios
* Se reemplazan las *a* y las *e* por *vacío* para eliminarlas

```ts
const onePunch = (s :string) => s ==''? ('Broken!'):(s.split(" ").sort().join(" ").replace(/a|e/g,""));

console.log(onePunch('Beard Jeans Hairbrush Knuckleduster Sand'))           //=>‘Brd Hirbrush Jns Knuckldustr Snd’
console.log(onePunch('Sock Beard Vest Lady Sage'))                          //=>’Brd Ldy Sg Sock Vst’
console.log(onePunch('Beard Sack Gun Parachute Face-Kicking-Shoes'))        //=>’Brd Fc-Kicking-Shos Gun Prchut Sck’
console.log(onePunch('Snot Snow Soda Tank Beard'))                          //=>’Brd Snot Snow Sod Tnk’
console.log(onePunch(''))                                                   //=>’Broken!’

```

#### 1.6 Ejercicio 6

**Enunciado:**

El Proceso de verificación ISBN-10 se usa para validar la identificación de números. Normalmente contienen guiones y siguen un patrón como: 3-598-21508-8.

El formato ISBN-10 está compuesto por 9 dígitos (0-9) y un caracter de comprobación que puede ser un dígito (0-9) o una X. En caso de que el caracter de comprobación sea una X, se representa con el valor ‘10. Estos valores su pueden comunicar con o sin guiones, y se puede comprobar su validez con la siguiente fórmula:

(x1 * 10 + x2 * 9 + x3 * 8 + x4 * 7 + x5 * 6 + x6 * 5 + x7 * 4 + x8 * 3 + x9 * 2 + x10 * 1) mod 11 == 0

Si el resultado es 0, entonces el código ISBN-10 es válido. En cualquier otro caso el código se considera no válido.

El código ISBN-10 3-598-21508-8 da como resultado 0 y por lo tanto es un código ISBN válido:

(3 * 10 + 5 * 9 + 9 * 8 + 8 * 7 + 2 * 6 + 1 * 5 + 5 * 4 + 0 * 3 + 8 * 2 + 8 * 1) mod 11 == 0

Para resolver este ejercicio, defina una función isValidISBN que compruebe la validez de un código ISBN-10. La función recibirá como parámetro una cadena de caracteres compuesta por un posible código ISBN-10 separado o no por guiones. Como resultado, la función devolverá verdadero o falso según corresponda con la validez del código ISBN-10. Tenga en cuenta que la cadena de entrada a la función puede ser del tipo “3-598-21508-8” o “3598215088”. Para ambos casos el valor devuelto debe ser el mismo.

**Resolución:**

Para comprobar la validez de un código se realizan primero dos comprobaciones básicas:

* Que no tenga más ni menos de 10 dígitos (`s.length != 10`)
* Que no haya ninguna letra a parte de la X del final (`i!=9 && isNaN(parseInt(s[i])) || (i==9 && s[i]!='X' && isNaN(parseInt(s[i])))`)

Después haremos la comprobación final con la fórmula:

* Ya que la formula usa un conteo regresivo de 9 a 0 y lo multiplica por cada valor, invertiremos el array que contiene los valores para poder hacer toda la operación en un bucle de manera más sencilla.
* Hacemos un sumatorio de todas estas multiplicaciones y le hacemos módulo 11
* Si el resultado es 0, será valido

```ts
function isValidISBN(s :string){
s = s.split("-").join(""); //las que tengan guiones se les quita para manejarlas
if (s.length != 10){ //si tiene menos de 10 digitos
    return false;
}
var valor = []
for (var i :number = 0; i < 10; i++){
    if (i!=9 && isNaN(parseInt(s[i])) || (i==9 && s[i]!='X' && isNaN(parseInt(s[i])))){ //si hay alguna letra que no sea la X del final
        return false;
    }
    if (s[i]=='X'){
        valor[i] = 10;
    } else {
        valor[i] = parseInt(s[i]);
    }
}
valor = valor.reverse(); // se invierte el array para facilitar el sumatorio
var sumatorio :number = 0;
for (var i :number = 10; i >= 1; i--){
    sumatorio = sumatorio + (valor[i-1]*i);
}
if (sumatorio%11 == 0){
    return true;
} else {
    return false;
}

}

console.log(isValidISBN('3-598-21507-X'))  //true
console.log(isValidISBN('359821507X'))     //true
console.log(isValidISBN('3-598-21508-8'))  //true
console.log(isValidISBN('36571'))          //false
console.log(isValidISBN('0-100-00000-0'))  //false
console.log(isValidISBN('0-000-00000-0'))  //true
```

#### 1.7 Ejercicio 7

**Enunciado:**

Defina una función que reciba como parámetro un entero positivo y devuelva el siguiente número mayor que pueda ser formado al reposicionar sus dígitos. En caso de no poder reposicionar los dígitos para conseguir un número mayor, la función debe devolver un valor -1.

**Resolución:**

Para recombinar el numero: 
* Convertimos la entrada a un array para poder manipular sus digitos
* Partimos de que la ultima posicion es la mayor
* Vamos comparando cada posición con la siguiente de atrás hacia alante. Si la posicion es mayor se intercambia y se devuelve el vector intercambiado, si no:
* Seguimos buscando hasta el principio del vector y devolvemos -1 si no se da el caso

(Si el número es de un solo dígito tambien devolvemos -1)

```ts

function siguienteMayor (s :string){
    if (s.length == 1){
        return -1
    }
    var s_array :string[] = s.split("");
    var mayor :number = parseInt(s_array[s_array.length-1]);
    var i :number = s_array.length-1;
    while (i >= 0){
        var pos :number = parseInt(s_array[i]);
        if (mayor > pos){
            s_array[i] = mayor.toString();
            s_array[i+1] = pos.toString();
            return s_array.join("");
        } else {
            mayor = pos;
            i--
        }
    }
    return -1
}

console.log(siguienteMayor('12'));   // -> 21
console.log(siguienteMayor('513'));  // -> 531
console.log(siguienteMayor('2017')); // -> 2071
console.log(siguienteMayor('9'));    // -> -1
console.log(siguienteMayor('111'));  // -> -1
console.log(siguienteMayor('531'));  // -> -1
```

#### 1.8 Ejercicio 8

**Enunciado:**

A partir de una cadena de texto que representa una dirección IPv4, cree una función que reciba como parámetro dicha cadena y devuelva un valor numérico que represente el número de IPs disponibles en ese rango (incluyendo la primera y excluyendo la última).

**Resolución:**

El numero de ips de una dirección se obtiene sumando cada digito multiplicado por la posición en la que está (de atrás hacia alante) elevado a 256 (cada punto representa 256 del punto anterior).

* Haremos una array para cada dirección
* Los invertiremos para poder hacer el sumatorio de atrás hacia alante
* Haremos el sumatorio para cada dirección
* Y las restaremos para obtener el rango

```ts
function ipsInRange(ip2 :string, ip1 :string){
    var ip1_array :string[] = ip1.split(".");
    var ip2_array :string[] = ip2.split(".");

    var ips_totales :number = 0;
    var ips_cogidas :number = 0;

    ip1_array = ip1_array.reverse();
    ip2_array = ip2_array.reverse();

    for (var i :number = 0; i < 4; i++){
        ips_totales = ips_totales + parseInt(ip1_array[i])*Math.pow(256,i);
        ips_cogidas = ips_cogidas + parseInt(ip2_array[i])*Math.pow(256,i);
    }

    return ips_totales - ips_cogidas;    
}

console.log(ipsInRange('10.0.0.0','10.0.0.50'));  //50
console.log(ipsInRange('10.0.0.0','10.0.1.0'));   //256
console.log(ipsInRange('20.0.0.10','20.0.1.0'));  //246
```

#### 1.9 Ejercicio 9

**Enunciado:**

¡¡Estás en medio de un combate Pokemon!! Tu tarea es calcular el daño que un movimiento concreto causará a partir de la siguiente fórmula:

daño = 50 * (ataque / defensa) * efectividad

Donde ataque es tu poder de ataque, defensa es la capacidad de defensa del oponente y la efectividad del ataque se basa en lo siguiente.

Los ataques pueden ser super efectivos, neutrales o no muy efectivos. Esto depende del tipo de Pokemons que estén combatiendo.

* Super efectivo = x2 de daño
* Neutral = x1 de daño
* No muy efectivo = x0.5 de daño

Considerando únicamente Pokemons de tipo fuego, agua, hierba y eléctrico, la efectividad de cada emparejamiento es la siguiente:


* fuego > hierba
*  fuego < agua
* fuego = eléctrico
* agua < hierba
* agua < eléctrico
* hierba = eléctrico

Ten en cuenta que los ataques entre Pokemons de mismo tipo no serán muy efectivos. Además, las relaciones son simétricas. Es decir, si un tipo A es super efectivo sobre un tipo B, entonces B será poco efectivo contra A.

Defina una función que reciba como parámetro el tipo de Pokemon que tiene, el tipo de Pokemon de su oponente, su capacidad de ataque y la capacidad de ataque de su oponente. La función devolverá como resultado el daño causado.

**Resolución:**

Para simplificar el paso de argunmentos a la función crearemos objetos de tipo pokemon que contendrán el tipo, el ataque y la defensa de cada pokemon:

```ts
type pokemon = {
    tipo: string, 
    ataque: number,
    defensa: number
};
```

Contemplaremos todas las posibles combinaciones de tipos y cambiaremos la efectividad en función de la combinación. Usaremos este valor de efectividad para la fórmula del daño (`daño = 50 * (ataque / defensa) * efectividad`)

```ts
function pokemonDamage(tipo_at :string,tipo_df :string,at :number, df :number){
    var efectividad :number = 0.0;

    switch (true) {
        case tipo_at == "fuego" && tipo_df =="hierba":
        case tipo_at == "agua" && tipo_df =="fuego":
        case tipo_at == "hierba" && tipo_df =="agua":
        case tipo_at == "electrico" && tipo_df =="agua":
            efectividad = 2.0;
            break;
        case tipo_at == "fuego" && tipo_df =="electrico":
        case tipo_at == "electrico" && tipo_df =="fuego":
        case tipo_at == "hierba" && tipo_df =="electrico":
        case tipo_at == "electrico" && tipo_df =="hierba":
            efectividad = 1.0;
            break;
        case tipo_at == tipo_df:
        case tipo_at == "hierba" && tipo_df =="fuego":
        case tipo_at == "fuego" && tipo_df =="agua":
        case tipo_at == "agua" && tipo_df =="hierba":
        case tipo_at == "hierba" && tipo_df =="fuego":
            efectividad = 0.5;
            break;
        default:
            break;
    }
    console.log(efectividad)
    if (efectividad == 0){
        return ("Error: Tipo mal especificado")
    }
    var damage = 50 * (at/df) * efectividad;
    return damage;
}

var pokemon1 :pokemon = {
    tipo: "fuego",
    ataque: 120,
    defensa: 30
}

var pokemon2 :pokemon = {
    tipo: "agua",
    ataque: 50,
    defensa: 100
}

var pokemon3 :pokemon = {
    tipo: "hierba",
    ataque: 70,
    defensa: 90
}

var pokemon4 :pokemon = {
    tipo: "electrico",
    ataque: 110,
    defensa: 40
}

console.log("pokemon1 vs pokemon3: ",pokemonDamage(pokemon1.tipo,pokemon3.tipo,pokemon1.ataque,pokemon3.defensa)); //133.333
console.log("pokemon3 vs pokemon4: ",pokemonDamage(pokemon3.tipo,pokemon4.tipo,pokemon3.ataque,pokemon4.defensa)); //87.5
console.log("pokemon2 vs pokemon2: ",pokemonDamage(pokemon2.tipo,pokemon2.tipo,pokemon2.ataque,pokemon2.defensa)); //12.5
console.log("pokemon4 vs pokemon2: ",pokemonDamage(pokemon4.tipo,pokemon2.tipo,pokemon4.ataque,pokemon2.defensa)); //110
```


#### 1.10 Ejercicio 10

**Enunciado:**

Cree una función isValidUsername que compruebe la validez de un nombre de usuario. La función recibirá como parámetro una cadena con un nombre de usuario y devolverá verdadero o falso según las siguientes condiciones.

* El nombre de usuario tiene que tener al menos 4 caracteres y no más de 30.
* El nombre de usuario no puede empezar ni terminar con un guión bajo.
* El nombre de usuario tiene que contener al menos una letra mayúscula, una letra minúscula, un número y algún símbolo especial ($,-,_).
* No se permite la repetición de un mismo tipo de caracter más de dos veces seguidas.

Por ejemplo, el nombre de usuario "u__hello$122__" no sería válida ya que aparecen cinco letras seguidas y tres números seguidos. Además, termina por _ y no contiene ninguna letra mayúscula.

**Resolución:**

Para comprobar la validez seguiremos una serie de pasos:

Haremos las comprobaciones básicas:
* Que la longitud esté entre 4 y 30
* Que no empiece ni acabe por _

Después nos ayudaremos de expresiones regulares que representarán patrones de búsqueda para realizar las comprobaciones que tienen que ver con el tipo de caracter:
* Que haya uno de cada tipo
* Que no haya tres seguidos del mismo tipo

Para ello agruparemos los tipos en un array y lo recorreremos para la string asegurándonos de que se encuentre cada uno (haremos lo mismo para los que se repite 3 veces pero comprobaremos que NO se encuentra (`search = -1`))

```ts

function isValidUsername (s :string){
    if (s.length < 4 || s.length > 30){
        return false;
    }
    if (s[0]=="_" || s[s.length-1]=="_"){
        return false;
    }

    var mayus :RegExp = /[A-Z]/g;
    var minus :RegExp = /[a-z]/g;
    var especial : RegExp = /[$_-]/g;
    var tipos :RegExp[] = [mayus,minus,especial];

    var mayus_triple :RegExp = /[A-Z][A-Z][A-Z]/g;
    var minus_triple :RegExp = /[a-z][a-z][a-z]/g;
    var especial_triple :RegExp = /[$_-][$_-][$_-]/g;
    var triple :RegExp[] = [mayus_triple,minus_triple,especial_triple];

    for (var i :number = 0; i < tipos.length; i++){
        var una_de_cada = s.match(tipos[i]);
        if (una_de_cada == null){
            return false;
        }

    }
    for (var i :number = 0; i < triple.length; i++){
        var tres_mismo_tipo = s.search(triple[i]);
        if (tres_mismo_tipo != -1){
            return false
        }

    }
    return true;

}

console.log(isValidUsername("u__Hel$12"));   //true
console.log(isValidUsername("u__Hello$12")); //false
console.log(isValidUsername("uhello122"));   //false
```

### Conclusiones

La realización de los ejercicios me acabó resultando mucho más complicada de lo que parecía a simple vista. Tuve que dedicar bastante tiempo a pensar y trabajar cada ejercicio (cosa que me sirvió para darme cuenta a grosso modo de mis debilidades y fortalezas en typescript). Esta experiencia me forzó a aprender a usar muchas herramientas que no conocía para resolver problemas en programación (sobretodo las expresiones regurlares).

### Bibliografía

