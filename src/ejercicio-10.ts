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