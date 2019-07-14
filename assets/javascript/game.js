var enemyCount;
var enemySelect;
var player;
var enemy;
var baseAP;
var replace = [];
var luke = {name: "luke", baseAP: 5, AP: 5, HP: 110};
var obiwan = {name: "obiwan", baseAP: 9, AP: 9, HP: 135};
var maul = {name: "maul", baseAP: 12, AP: 12, HP: 150};
var sidious = {name: "sidious", baseAP: 17, AP: 17, HP: 180};
var characters = [luke, obiwan, maul, sidious];
var clash = document.createElement("audio");
clash.setAttribute("src", "./assets/audio/Lightsaber.mp3");

//function to reset all characters AP and HP to base
function charaterGen(){
    luke.AP = 5;
    luke.HP = 100;
    obiwan.AP = 9;
    obiwan.HP = 120;
    maul.AP = 13;
    maul.HP = 150;
    sidious.AP = 17;
    sidious.HP = 180;
}

//unneccesary function to dynamically create stars cause why not :)
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

//function to check win condition, if three characters beaten you win the game
function winCheck(){
    if (enemyCount === 3){
        $("#result").append("You Win!");
        $(".attack").css("visibility", "hidden");
        $(".reset").css("visibility", "visible");
    }
}

//function to check if you or your opponent has died
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

//function bound to the attack button, will make you and your opponent attack each other
function attack() {
    clash.play();
    if(enemySelect){
        player.HP =  player.HP - enemy.AP;
        enemy.HP = enemy.HP - player.AP;
        player.AP = player.AP + player.baseAP;
        $(".player").children(".hp").text("HP: " + player.HP);
        $(".enemy").children(".hp").text("HP: " + enemy.HP);
        deathCheck();
    }
}

//function to select enemy and move it to enemy area
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

//function for character selection and move it to player area
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

//function bound to the reset button to reset the play board
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

//function to start new game, called on first load and every reset
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

//game initialization
$(document).ready(function() {
    background();
    $(".character").on("click", move);
    $(".attack").on("click", attack);
    $(".reset").on("click", reset);
    newGame();
});

