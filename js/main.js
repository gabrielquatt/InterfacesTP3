"use strict";

/**
 *  Elementos del escenario de juego
 *  inicialmente ocultos hasta que se de inicio al juego
 */
let gameContainer = document.getElementById("gameContainer");
let menu = document.getElementById("menu");
let info = document.getElementById("info");
let lost = document.getElementById("lostMenu");
let grass = document.getElementById("grass");
let forest = document.getElementById("forest");
let highland = document.getElementById("highland");
grass.style.display = "none";
forest.style.display = "none";
highland.style.display = "none";
info.style.display = "none";
lost.style.display = "none";

/**
 * -------------- iniciar/reiniciar juego --------------
 */
let btn_start = document.getElementById("btn_start");
let btn_restart = document.getElementById("btn_restart");

btn_start.addEventListener("click", () => {
  iniciar();
});

btn_restart.addEventListener("click", () => {
  iniciar();
});

function iniciar() {
  let game = new Game();

  // mostrar escenario 
  lost.style.display = "none";
  menu.style.display = "none";
  grass.style.display = null;
  forest.style.display = null;
  highland.style.display = null;
  gameContainer.classList.remove("gameStop");
  gameContainer.classList.add("sky1");

  // iniciar juego
  game.init();
}

/**
 * -------------- mostrar/ocultar cartel '¿como jugar?' --------------
 */
document.getElementById("btn_info").addEventListener("click", () => {
  menu.style.display = "none";
  info.style.display = null;
});

document.getElementById("btn_close").addEventListener("click", () => {
  info.style.display = "none";
  menu.style.display = null;
});


