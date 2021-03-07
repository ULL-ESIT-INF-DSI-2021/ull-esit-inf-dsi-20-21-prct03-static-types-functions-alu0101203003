function isValidISBN(s :string){
s = s.split("-").join("");
if (s.length != 10){
    return false;
}
var valor = []
for (var i :number = 0; i < 10; i++){
    if (i!=9 && isNaN(parseInt(s[i])) || (i==9 && s[i]!='X' && isNaN(parseInt(s[i])))){
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