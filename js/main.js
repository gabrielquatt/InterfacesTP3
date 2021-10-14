"use strict"

let menu = document.getElementById("menu");
let info = document.getElementById("info");

//oculta el div info
info.style.display = "none";

let btn_info = document.getElementById("btn_info").addEventListener('click', ()=>{
    menu.style.display = "none";
    info.style.display = null;
});
let btn_start = document.getElementById("btn_start").addEventListener('click', ()=>{
    menu.style.display = "none";
});

let btn_close = document.getElementById("btn_close").addEventListener('click',()=>{
    info.style.display = "none";
    menu.style.display = null;
})