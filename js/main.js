"use strict"

let menu = document.getElementById("menu");
let info = document.getElementById("info");
let gameContainer = document.getElementById("gameContainer");
let grass = document.getElementById("grass");
let runner = document.getElementById("sonic");
let btn_start= document.getElementById("btn_start");
let game = new Game();

grass.style.display ="none";
//oculta el div info
info.style.display = "none";
runner.style.visibility = "hidden";

let btn_info = document.getElementById("btn_info").addEventListener('click', ()=>{
    menu.style.display = "none";
    info.style.display = null;
});

btn_start.addEventListener('click', ()=>{
    menu.style.display = "none";
    grass.style.display =null;

    runner.style.visibility = "visible";
    gameContainer.classList.remove("gameStop");
    gameContainer.classList.add("highland");
    game.init();
});

let btn_close = document.getElementById("btn_close").addEventListener('click',()=>{
    info.style.display = "none";
    menu.style.display = null;
})

btn_start.click()