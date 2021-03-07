function decimalToFactorial (n :number) {
    var codificado = "";
    var i :number = 0;
    var max_factorial :number = 0;
    while (i < 100) {
    max_factorial = i;
    var factorial_base = factorial(i);
        if (factorial_base >= n){
            max_factorial--;
            break;
        }
        else {
            i++;
        }
    }
    var resto = n;
    for(i = max_factorial; i > 0; i --) {
        var factorial_base = factorial(i);
        var cociente = Math.floor(resto/factorial_base);
        resto = resto - factorial_base*cociente;
        codificado = codificado+cociente;
    }
    return codificado;

}

function factorialToDecimal (s :string) {
var sz: number = s.length;
var j :number = sz;
var num :number = 0;
for (var i :number = 0; i < sz; i++){
    var tmp :number = parseInt(s[i]);
    tmp = tmp * factorial(j);
    num = num + tmp;
    j--;
}
return num;

}

function factorial (n :number) { 
	if (n == 0){ 
		return 1; 
	}
	return n * factorial (n-1); 
}

console.log(decimalToFactorial(463));     //34101
console.log(factorialToDecimal("34101")); //463