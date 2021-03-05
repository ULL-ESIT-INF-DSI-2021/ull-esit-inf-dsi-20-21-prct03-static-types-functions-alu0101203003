function fromSnakeToCamelCase (s :string) {
    var result = "";
    var patron :RegExp = /[_][a-z]/g; //todos los elementos formados por un guion bajo seguido de una minuscula
    result = s.replace(patron,grupo => grupo.toUpperCase()); //reemplaza el grupo que coincide por el propio grupo en mayusculas
    result = result.replace(/[_]/g, ""); //se quitan los guiones bajos
    return result;
}

function fromCamelToSnakeCase (s :string) {
    var result = "";
    var patron :RegExp = /(?=[A-Z])/g; //todos los elementos a los que le sigue una mayuscula
    result = s.split(patron).join("_"); //divide los elementos que cumplen con el patron y los une con guiones bajos
    result = result.toLowerCase(); // se pasa a minusculas
    return result;
}

console.log(fromSnakeToCamelCase("hola_mundo"));
console.log(fromCamelToSnakeCase("holaMundo"));
