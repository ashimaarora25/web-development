var randomNumber1 = Math.floor(Math.random() * 6) + 1;
var randomDiceImage = "dice" + randomNumber1 + ".png";
var randomImageSource = "images/" + randomDiceImage;

document.querySelector("img.img1").setAttribute("src", randomImageSource);



var randomNumber2 = Math.floor(Math.random() * 6) + 1;
var randomDiceImage2 = "dice" + randomNumber2 + ".png";
var randomImageSource2 = "images/" + randomDiceImage2;

document.querySelector("img.img2").setAttribute("src", randomImageSource2);


if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").innerHTML = "Player 1 Wins! <icon class=\"fa-solid fa-flag fa-lg\"></icon>";
}
else if (randomNumber1 < randomNumber2) {
    document.querySelector("h1").innerHTML = "Player 2 Wins! <icon class=\"fa-solid fa-flag fa-lg\"></icon>";
}
else {
    document.querySelector("h1").textContent = "Draw! ";

}