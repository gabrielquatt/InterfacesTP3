class Game {
  constructor() {
    this.runner = new Runner();
    this.isMakeEnemy = false;
    this.isMakeRing = false;
    this.enemies = [];
    this.rings = [];
    this.ringsCount = 0;
    this.enemyCount = 0;
    this.gameContainer = document.getElementById("gameContainer");
    this.ringCount = document.getElementById("Mone_Recolec");
    this.score = document.getElementById("score");
    this.timeout=30;
    this.timer = document.getElementById("timer");
    this.scoreTotal = 0;
    this.loop;
    this.ringLoop;
    this.enemyLoop;
    this.enemyWait;
    this.ringWait;
    this.lostMenu = document.getElementById("lostMenu");
    this.grass = document.getElementById("grass");
    this.forest = document.getElementById("forest");
    this.highland = document.getElementById("highland");
    this.coinSound = new Audio("/music/SonicRing.ogg");
    this.lostSound = new Audio("/music/SonicLost.ogg");
    this.coinSound.volume = 0.10;
    this.lostSound.volume = 0.10;
    this.ringCount.innerHTML =  "<img class='imgMenu' src='img/sprites/monedaMenu.png' alt='enemigo3'>  x"+ this.ringsCount;
  }

  init() {
    this.gameContainer.appendChild(this.runner.container());
    this.updateScore();
    this.timerGame();
    this.enemyLoop = setInterval(this.addEnemy.bind(this), 1000); // loop para crear enemigos
    this.ringLoop = setInterval(this.addRing.bind(this), 1000); // loop para crear monedas
    this.loop = setInterval(this.gameLoop.bind(this), 20); // loop para controlar estado del juego
  }

  gameLoop() {
    let runnerStatus = this.runner.status();
    // verificar monedas
    this.rings.forEach((ring) => {
      let ringStatus = ring.status();
      if (this.detectCollision(runnerStatus, ringStatus)) {
        this.collectCoin(ring);
      }
    });

    // verificar enemigos
    for (let i = 0; i < this.enemies.length; i++) {
      let enemyStatus = this.enemies[i].status();
      if (this.detectCollision(runnerStatus, enemyStatus)) {
        this.lost();
      }
      i++;
    }
  }

  collectCoin(ring) {
    this.coinSound.play();
    this.timeout = this.timeout+5;
    this.ringsCount = this.ringsCount+1;
    this.ringCount.innerHTML =  "<img class='imgMenu' src='img/sprites/monedaMenu.png' alt='enemigo3'>  x"+ this.ringsCount;
    this.scoreTotal= this.scoreTotal+100;
    this.updateScore();
    this.gameContainer.removeChild(ring.container());
    this.rings.splice(0, 1);
  }

  /**
   * @param {*} run div 1
   * @param {*} elem div 2
   * @returns superposicion entre dos divs
   */
  detectCollision(run, elem) {
    let h = run.x < elem.x + elem.width && run.x + run.width > elem.x;
    let v = run.y < elem.y + elem.height && run.y + run.height > elem.y;
    return h && v;
  }

  // TODO animacion de muerte, frenar fondo
  lost() {
    clearInterval(this.loop);
    clearInterval(this.ringLoop);
    clearInterval(this.enemyLoop);
    clearTimeout(this.enemyWait);
    clearTimeout(this.ringWait);
    this.lostSound.play(); 
    this.timeout=0;
    this.timer.innerHTML = "<h1>"+this.timeout+"</h1>";
    this.lostMenu.style.display = null;
    document.getElementById("scoreFinish").innerHTML= this.scoreTotal;
    document.getElementById("ringsTotal").innerHTML = this.ringsCount;
    this.grass.style.display = "none";
    this.forest.style.display = "none";
    this.highland.style.display = "none";

     this.enemies.forEach((enemy) => this.gameContainer.removeChild(enemy.container()));
    this.rings.forEach((ring) => this.gameContainer.removeChild(ring.container()));
    // this.runner.stop();
  }

  updateScore() {
   this.score.innerHTML = this.scoreTotal;
  }

  addRing() {
    if (!this.isMakeRing) {
      this.isMakeRing = true;
      let min = 3;
      let max = 10;
      let res = parseInt(Math.random() * (max - min) + min);
      this.ringWait = setTimeout(() => {
        this.makeRing();
      }, res * 1000);
    }
  }

  makeRing() {
    let ring = new Ring();
    this.rings.push(ring);
    this.gameContainer.appendChild(ring.container());
    ring.container().addEventListener("animationend", () => {
      this.gameContainer.removeChild(ring.container());
      this.rings.splice(0, 1);
    });
    this.isMakeRing = false;
  }

  addEnemy() {
    if (!this.isMakeEnemy) {
      this.isMakeEnemy = true;
      let min = 1;
      let max = 3;
      let res = parseInt(Math.random() * (max - min) + 1);
      this.enemyWait = setTimeout(() => {
        this.makeEnemy();
      }, res * 900);
    }
  }

  makeEnemy() {
    let type = parseInt(Math.random() * 3) + 1;
    let enemy = new Enemy(type, this.enemyCount);
    this.enemies.push(enemy);
    this.enemyCount++;
    this.gameContainer.appendChild(enemy.container());

    enemy.container().addEventListener("animationend", () => {
      this.scoreTotal = this.scoreTotal+5;
      this.updateScore();
      this.gameContainer.removeChild(enemy.container());
      this.enemies.splice(0, 1);
    });

    this.isMakeEnemy = false;
  }

  //====================================TIMER======================================//
	timerGame()
	{
    this.timeout = this.timeout-1;
    this.timer.innerHTML = "<h1>"+this.timeout+"</h1>";
    if(this.timeout<0){
      this.lost();
    }else{
      setTimeout(()=>{
        this.timerGame();
      },1000);
    }
	}

}
