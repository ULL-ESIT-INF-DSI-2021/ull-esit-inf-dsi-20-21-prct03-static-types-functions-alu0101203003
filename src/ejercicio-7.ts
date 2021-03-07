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