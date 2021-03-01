
function isLeapYear (year : number) {
    if(((year%4 == 0) && (year%100 != 0)) || ((year%100 == 0)&&(year%400 == 0))) {
       return true;
    }else {
        return false;
    }

}

var result :string = "";
var check :boolean = isLeapYear(100);
if (check){
    result = "es bisiesto";
} else {
    result = "no es bisiesto";
}

console.log(result);