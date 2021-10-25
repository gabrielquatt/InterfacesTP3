"use strict"

let menu = document.getElementById("menu");
let info = document.getElementById("info");
let lost = document.getElementById("lostMenu");
let gameContainer = document.getElementById("gameContainer");
let grass = document.getElementById("grass");
let forest = document.getElementById("forest");
let highland = document.getElementById("highland");

let btn_start = document.getElementById("btn_start");
let btn_restart = document.getElementById("btn_restart");
let game = new Game();
let btnMusic = document.getElementById('btnMusic');
let gameMusic = new Audio("/music/SonicMusic.ogg");


grass.style.display = "none";
forest.style.display = "none";
highland.style.display = "none";
//oculta el div info
info.style.display = "none";
lost.style.display = "none";

let btn_info = document.getElementById("btn_info").addEventListener('click', () => {
  menu.style.display = "none";
  info.style.display = null;
});

btn_start.addEventListener('click', () => {
  iniciar();
});

btn_restart.addEventListener('click', () => {
  iniciar();
})

function iniciar() {
  if (game != null) {
    game = null;
    game = new Game();
  }
  btnMusic.click();
  lost.style.display = "none";
  menu.style.display = "none";
  grass.style.display = null;
  forest.style.display = null;
  highland.style.display = null;
  gameContainer.classList.remove("gameStop");
  gameContainer.classList.add("sky1");
  game.init();
}

let btn_close = document.getElementById("btn_close").addEventListener('click', () => {
  info.style.display = "none";
  menu.style.display = null;
});


btnMusic.addEventListener("click", () => {
  playSound();
})

function playSound() {
  gameMusic.loop = true;
  gameMusic.volume = 0.10;

  if (!gameMusic.paused) {

    btnMusic.src = "/img/SoundOff.png";
    gameMusic.pause();
    gameMusic.currentTime = 0;
  } else {
    btnMusic.src = "/img/SoundOn.png";
    gameMusic.play();
  }
}

// btn_start.click();