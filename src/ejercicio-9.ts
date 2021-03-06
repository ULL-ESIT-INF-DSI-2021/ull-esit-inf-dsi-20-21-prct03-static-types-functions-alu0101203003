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
    ataque: 2100,
    defensa: 3200
}

var pokemon2 :pokemon = {
    tipo: "hierba",
    ataque: 2500,
    defensa: 2900
}

var pokemon3 :pokemon = {
    tipo: "electrico",
    ataque: 1900,
    defensa: 3000
}

console.log("pokemon1 vs pokemon2: ",pokemonDamage(pokemon1.tipo,pokemon2.tipo,pokemon1.ataque,pokemon2.defensa));
console.log("pokemon3 vs pokemon2: ",pokemonDamage(pokemon3.tipo,pokemon2.tipo,pokemon3.ataque,pokemon2.defensa));
console.log("pokemon1 vs pokemon1: ",pokemonDamage(pokemon1.tipo,pokemon1.tipo,pokemon1.ataque,pokemon1.defensa));