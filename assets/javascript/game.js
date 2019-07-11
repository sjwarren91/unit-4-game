// function Character(name, power, health) {
//     this.name = name;
//     this.AP = power;
//     this.HP = health;
// }

// var obiwan = new Character("Obi-wan Kenobi", 8, 120);
// var luke = new Character("Luke Skywalker", 5, 100);
// var sidious = new Character("Darth Sidious", 25, 180);
// var maul = new Character("Darth Maul", 20, 150);

// var check = false;

// $("#luke").data(luke);
// $("#obiwan").data(obiwan);
// $("#sidious").data(sidious);
// $("#maul").data(maul);

function deathCheck() {
    if($(".player").data("info").HP <= 0) {

    } else if ($(".enemy").data("info").HP <= 0) {
        $(".enemy").detach();
        $(".character").on("click", moveEnemy);
    }
}

function attack() {
    $(".player").data("info").HP -= $(".enemy").data("info").AP;
    $(".enemy").data("info").HP -= $(".player").data("info").AP;
    $(".player").children(".card-footer").text($(".player").data("info").HP);
    $(".enemy").children(".card-footer").text($(".enemy").data("info").HP);
    console.log($(".player").data("info").HP);
    deathCheck();
}

function moveEnemy(){
    $(this).detach().appendTo(".one");
    $(".character").off();
    $(this).removeClass("character");
    $(this).addClass("enemy");
}

function move() {
    $(this).detach().appendTo(".player-area");
    $(".character").off();
    $(this).removeClass("character");
    $(this).addClass("player");
    $(".character").detach().appendTo(".enemy-area");
    $(".character").css("background-color", "red");
    $(".character").on("click", moveEnemy);
}



$(document).ready(function() {
    $(".character").on("click", move);
    
    $(".attack").on("click", attack);


    $("#luke").data("info",{name: "Luke Skywalker", AP: 5, HP: 100});
    $("#obiwan").data("info",{name: "Obi-wan Kenobi", AP: 8, HP: 120});
    $("#maul").data("info",{name: "Darth Maul", AP: 20, HP: 150});
    $("#sidious").data("info",{name: "Darth Sidious", AP: 25, HP: 180});

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
$("#test").text($("#luke").data().AP);
