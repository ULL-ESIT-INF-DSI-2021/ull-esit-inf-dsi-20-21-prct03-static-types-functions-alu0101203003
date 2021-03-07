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

function factorial (n :number) { 
	if (n == 0){ 
		return 1; 
	}
	return n * factorial (n-1); 
}

console.log(decimalToFactorial(463));     //34101
console.log(factorialToDecimal("34101")); //463