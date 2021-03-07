function isValid (s :string) {
    if (s == ""){  //si es la cadena vacía
        return true;
    }
    for(var i :number = 0; i < s.length; i++){
        var cont = 0;
        var bloque :string = s.slice(i,s.length);
        var bloque_sz :number = parseInt(bloque);
        if (isNaN(bloque_sz)){
            return false;
        }
        var digito :string = bloque_sz.toString();
        bloque_sz = bloque_sz + digito.length;
        for(var j :number = i+digito.length; j < i + bloque_sz; j++){
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