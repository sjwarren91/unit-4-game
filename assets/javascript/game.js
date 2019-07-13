var enemyCount
var enemySelect
var player;
var enemy;
var replace = [];
var luke = {name: "luke", AP: 5, HP: 100};
var obiwan = {name: "obiwan", AP: 8, HP: 120};
var maul = {name: "maul", AP: 12, HP: 150};
var sidious = {name: "sidious", AP: 17, HP: 180};
var characters = [luke, obiwan, maul, sidious];
var clash = document.createElement("audio");
clash.setAttribute("src", "./assets/audio/Lightsaber.mp3");

function charaterGen(){
    luke.AP = 5;
    luke.HP = 100;
    obiwan.AP = 8;
    obiwan.HP = 120;
    maul.AP = 15;
    maul.HP = 150;
    sidious.AP = 20;
    sidious.HP = 180;
}

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
    if(player.HP <= 0) {
        $("#result").append("You Lose!");
        $(".attack").css("visibility", "hidden");
        $(".reset").css("visibility", "visible");
    } else if (enemy.HP <= 0) {
        replace.push($(".enemy").detach());
        $(".character").on("click", moveEnemy);
        enemyCount++;
        enemySelect = false;
    }
    winCheck();
}

function attack() {
    clash.play();
    if(enemySelect){
        player.HP =  player.HP - enemy.AP;
        enemy.HP = enemy.HP - player.AP;
        player.AP = player.AP + 8;
        $(".player").children(".hp").text("HP: " + player.HP);
        $(".enemy").children(".hp").text("HP: " + enemy.HP);
        deathCheck();
    }
}

function moveEnemy(){
    var id = $(this).attr("data-name");
    for (let i = 0; i < characters.length; i++){
        if(characters[i].name === id){
            enemy = characters[i];
        }
    }
    $(this).appendTo(".enemy-area");
    $(".character").off();
    $(this).removeClass("character");
    $(this).addClass("enemy");
    enemySelect = true;
}

function move() {
    var id = $(this).attr("data-name");
    for (let i = 0; i < characters.length; i++){
        if(characters[i].name === id){
            player = characters[i];
        }
    }
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
    $("#luke, #maul, #obiwan, #sidious").appendTo($(".sidebar"));
    $(".sidebar").append(replace);
    $(".player").addClass("character");
    $(".enemy").addClass("character");
    $(".enemy").removeClass("enemy");
    $(".player").removeClass("player");
    $("#result").text("");
    $(".reset").css("visibility", "hidden");
    $(".character").on("click", move);
    newGame();
}

function newGame(){
    enemyCount = 0;
    enemySelect = false;
    charaterGen();
    $(".character").css("background-color", "white");
    $("button").css("visbility", "hidden");
    $("#luke").children(".hp").text("HP: " + luke.HP);
    $("#obiwan").children(".hp").text("HP: " + obiwan.HP);
    $("#maul").children(".hp").text("HP: " + maul.HP);
    $("#sidious").children(".hp").text("HP: " + sidious.HP);
}

$(document).ready(function() {
    background();
    $(".character").on("click", move);
    $(".attack").on("click", attack);
    $(".reset").on("click", reset);
    newGame();
});

