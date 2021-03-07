type pokemon = {
    tipo: string, 
    ataque: number,
    defensa: number
};

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