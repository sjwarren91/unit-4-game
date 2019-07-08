function Character(name, power, health) {
    this.name = name;
    this.AP = power;
    this.HP = health;
}

var obiwan = new Character("Obi-wan Kenobi", 8, 120);
var luke = new Character("Luke Skywalker", 5, 100);
var sidious = new Character("Darth Sidious", 25, 180);
var maul = new Character("Darth Maul", 20, 150);

function attack(player, enemy) {
    player.HP -= enemy.AP;
    enemy.HP -= player.AP;
    player.AP += 8;
}

document.onkeyup = function(event) {

    if (obiwan.HP > 0 && luke.HP > 0) {
        attack(obiwan, luke);
        console.log("My Health:", obiwan.HP);
        console.log("My Power:", obiwan.AP);
        console.log("His Health", luke.HP);
    }
    
    if (obiwan.HP <= 0) {
        console.log("You Lose");
    } else if (luke.HP <= 0) {
        console.log("You Win");
    }

};
