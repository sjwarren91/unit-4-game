function Character(name, power, health) {
    this.name = name;
    this.AP = power;
    this.HP = health;
}

var obiwan = new Character("Obi-wan Kenobi", 8, 120);
var luke = new Character("Luke Skywalker", 5, 100);
var sidious = new Character("Darth Sidious", 25, 180);
var maul = new Character("Darth Maul", 20, 150);



$("#luke").data(luke);
$("#obiwan").data(obiwan);
$("#sidious").data(sidious);
$("#maul").data(maul);

function attack(player, enemy) {
    player.HP -= enemy.AP;
    enemy.HP -= player.AP;
    player.AP += 8;
}

function move(){
    $(this).detach().appendTo(".two");
    $(".character").off();
};

$(document).ready(function(){
    $(".character").on("click", move);
});







// $("#luke").data("info",{name: "Luke Skywalker", AP: 5, HP: 100});
// $("#obiwan").data("info",{name: "Obi-wan Kenobi", AP: 8, HP: 120});

// function print($player){
//     console.log($($player).data("info").name)
// }
// var luke = $("#luke");
// print(luke);

// document.onkeyup = function(event) {


    // if (obiwan.HP > 0 && luke.HP > 0) {
    //     attack(obiwan, luke);
    //     console.log("My Health:", obiwan.HP);
    //     console.log("My Power:", obiwan.AP);
    //     console.log("His Health", luke.HP);
    // }
    
    // if (obiwan.HP <= 0) {
    //     console.log("You Lose");
    // } else if (luke.HP <= 0) {
    //     console.log("You Win");
    // }

// };

// var div1 = $("#luke").detach();
// div1.appendTo(".two");

// $("#luke").data(luke);
// $("#test").text($("#luke").data().name);
