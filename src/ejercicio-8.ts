function ipsInRange(ip2 :string, ip1 :string){
    var ip1_array = ip1.split(".");
    var ip2_array = ip2.split(".");

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