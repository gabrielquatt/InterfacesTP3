"use strict"

let menu = document.getElementById("menu");
let info = document.getElementById("info");
let lost = document.getElementById("lost");
let gameContainer = document.getElementById("gameContainer");
let grass = document.getElementById("grass");
let forest = document.getElementById("forest");
let highland = document.getElementById("highland");
let runner = document.getElementById("sonic");
let btn_start = document.getElementById("btn_start");
let game = new Game();

grass.style.display = "none";
forest.style.display = "none";
highland.style.display = "none";
//oculta el div info
info.style.display = "none";
lost.style.display = "none";
runner.style.visibility = "hidden";

let btn_info = document.getElementById("btn_info").addEventListener('click', () => {
  menu.style.display = "none";
  info.style.display = null;
});

btn_start.addEventListener('click', () => {
  menu.style.display = "none";
  grass.style.display = null;
  forest.style.display = null;
  highland.style.display = null;
  runner.style.visibility = "visible";
  gameContainer.classList.remove("gameStop");
  gameContainer.classList.add("sky1");
  game.init();
  funcionando();
});

let btn_close = document.getElementById("btn_close").addEventListener('click', () => {
  info.style.display = "none";
  menu.style.display = null;
})

// btn_start.click()



//====================================TIMER======================================//
  let timeout=30;
  let t = timeout ;
  let timer = document.getElementById("timer");
  let m = document.getElementById("Mone_Recolec");
	function funcionando()
	{

    t = t-1;
    m.innerHTML = "<img class='imgMenu' src='img/sprites/monedaMenu.png' alt='enemigo3'>  x"+t;
    timer.innerHTML = "<h1>"+t+"</h1>";
    if(t==0){
      alert("Time Lost");
    }else{
      setTimeout(()=>{
        funcionando();
      },1000);
    }
	}
  
