"use strict"

let menu = document.getElementById("menu");
let info = document.getElementById("info");
let game = document.getElementById("game");
let grass = document.getElementById("grass");
let runner = document.getElementById("sonic");
let g = new Game();

grass.style.display ="none";
//oculta el div info
info.style.display = "none";
runner.style.visibility = "hidden";

let btn_info = document.getElementById("btn_info").addEventListener('click', ()=>{
    menu.style.display = "none";
    info.style.display = null;
});
let btn_start = document.getElementById("btn_start").addEventListener('click', ()=>{
    menu.style.display = "none";
    grass.style.display =null;

    runner.style.visibility = "visible";
    game.classList.remove("gameStop");
    game.classList.add("highland");
    g.init();
});

let btn_close = document.getElementById("btn_close").addEventListener('click',()=>{
    info.style.display = "none";
    menu.style.display = null;
})