const onePunch = (s :string) => s ==''? ('Broken!'):(s.split(" ").sort().join(" ").replace(/a|e/g,""));

console.log(onePunch('Beard Jeans Hairbrush Knuckleduster Sand'))           //=>‘Brd Hirbrush Jns Knuckldustr Snd’
console.log(onePunch('Sock Beard Vest Lady Sage'))                          //=>’Brd Ldy Sg Sock Vst’
console.log(onePunch('Beard Sack Gun Parachute Face-Kicking-Shoes'))        //=>’Brd Fc-Kicking-Shos Gun Prchut Sck’
console.log(onePunch('Snot Snow Soda Tank Beard'))                          //=>’Brd Snot Snow Sod Tnk’
console.log(onePunch(''))                                                   //=>’Broken!’