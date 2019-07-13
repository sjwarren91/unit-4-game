var enemyCount = 0;
var enemySelect = false;

function background(){
    var stars = 500;

    for (let i = 0; i < stars; i++){
        var star = document.createElement("div")
        star.className = "star";
        var pos = getPosition();
        star.style.top = pos[0] + 'px';
        star.style.left = pos[1] + 'px';
        document.body.append(star);
    }

    function getPosition() {
        var x = window.innerWidth;
        var y = window.innerHeight;
        var ranx = Math.floor(Math.random()*y);
        var rany = Math.floor(Math.random()*x);
        return [ranx, rany];
    }
}

function winCheck(){
    if (enemyCount === 3){
        $("h1").append("<br>" + "You Win!");
        $(".attack").css("visibility", "hidden");
        $(".reset").css("visibility", "visible");
    }
}

function deathCheck() {
    if($(".player").data("info").HP <= 0) {
        $("#result").append("You Lose!");
        $(".attack").css("visibility", "hidden");
        $(".reset").css("visibility", "visible");
    } else if ($(".enemy").data("info").HP <= 0) {
        $(".enemy").detach();
        $(".character").on("click", moveEnemy);
        enemyCount++;
        enemySelect = false;
    }
    winCheck();
}

function attack() {
    if(enemySelect){
        $(".player").data("info").HP -= $(".enemy").data("info").AP;
        $(".enemy").data("info").HP -= $(".player").data("info").AP;
        $(".player").data("info").AP += 8;
        $(".player").children(".hp").text("HP: " + $(".player").data("info").HP);
        $(".enemy").children(".hp").text("HP: " + $(".enemy").data("info").HP);
        console.log($(".player").data("info").HP);
        deathCheck();
    }
}

function moveEnemy(){
    $(this).appendTo(".enemy-area");
    $(".character").off();
    $(this).removeClass("character");
    $(this).addClass("enemy");
    enemySelect = true;
}

function move() {
    $(this).appendTo(".player-area");
    $(".character").off();
    $(this).removeClass("character");
    $(this).addClass("player");
    $(".character").css("background-color", "red");
    $(".character").on("click", moveEnemy);
    $(".attack").css("visibility", "visible");
    $("h2").text("Choose Your Enemy!")
}

function reset(){
    
}

$(document).ready(function() {
    background();
    $(".character").on("click", move);
    
    $(".attack").on("click", attack);

    $(".reset").on("click", reset);

    $("#luke").data("info",{name: "Luke Skywalker", AP: 5, HP: 100});
    $("#obiwan").data("info",{name: "Obi-wan Kenobi", AP: 8, HP: 120});
    $("#maul").data("info",{name: "Darth Maul", AP: 15, HP: 150});
    $("#sidious").data("info",{name: "Darth Sidious", AP: 20, HP: 180});

    $("#luke").children(".hp").text("HP: " + $("#luke").data("info").HP);
    $("#obiwan").children(".hp").text("HP: " + $("#obiwan").data("info").HP);
    $("#maul").children(".hp").text("HP: " + $("#maul").data("info").HP);
    $("#sidious").children(".hp").text("HP: " + $("#sidious").data("info").HP);
    
    
});

