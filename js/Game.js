class Game {
  constructor() {
    // instanciar personaje principal
    this.runner = new Runner();

    // variables de aparicion aleatoria de enemigos y anillos
    this.isMakeEnemy = false;
    this.isMakeRing = false;
    this.ringLoop;
    this.enemyLoop;
    this.enemyWait;
    this.ringWait;
    this.enemies = [];
    this.rings = [];

    // elementos HTML
    this.gameContainer = document.getElementById("gameContainer");
    this.ringCount = document.getElementById("Mone_Recolec");
    this.parent = document.getElementById("parent");
    this.header = document.getElementById("header");
    this.score = document.getElementById("score");
    this.timer = document.getElementById("timer");
    this.lostMenu = document.getElementById("lostMenu");
    this.grass = document.getElementById("grass");
    this.forest = document.getElementById("forest");
    this.highland = document.getElementById("highland");

    // puntaje y tiempo
    this.ringsCount = 0;
    this.scoreTotal = 0;
    this.timeout = 30;
    this.ringCount.innerHTML = this.ringsCount;

    // game loop principal
    this.loop;

    // sonidos del juego
    this.btnMusic = document.getElementById("btnMusic");
    this.gameMusic = new Audio("/music/SonicMusic.ogg");
    this.ringSound = new Audio("/music/SonicRing.ogg");
    this.lostSound = new Audio("/music/SonicLost.ogg");
    this.gameMusic.volume = 0;
    this.ringSound.volume = 0;
    this.lostSound.volume = 0;

    this.btnMusic.addEventListener("click", () => {
      this.playSound();
    });
  }

  /**
   * inicio del juego
   */
  init() {
    // mostrar escenario y animaciones
    this.grass.style.animationPlayState = "running";
    this.forest.style.animationPlayState = "running";
    this.highland.style.animationPlayState = "running";
    this.parent.classList.add("blue");
    this.header.style.visibility = "visible";

    // añadir personaje principal al escenario del juego
    this.gameContainer.appendChild(this.runner.container());

    // mostrar puntaje y tiempo
    this.updateScore();
    this.timerGame();

    // loop para crear enemigos
    this.enemyLoop = setInterval(this.addEnemy.bind(this), 1000);

    // loop para crear anillos
    this.ringLoop = setInterval(this.addRing.bind(this), 1000);

    // loop de control del juego
    this.loop = setInterval(this.gameLoop.bind(this), 50);
  }

  /**
   * game loop principal
   */
  gameLoop() {
    let runnerStatus = this.runner.status();

    // verificar recoleccion de anillos
    for (let i = 0; i < this.rings.length; i++) {
      let ringStatus = this.rings[i].status();
      if (this.detectCollision(runnerStatus, ringStatus)) {
        this.collectRing(this.rings[i]);
      }
    }

    // verificar colision con enemigos
    for (let i = 0; i < this.enemies.length; i++) {
      let enemyStatus = this.enemies[i].status();

      // se pierde el juego al chocar con un enemigo (no se los puede matar)
      if (this.detectCollision(runnerStatus, enemyStatus)) {
        this.lost();
      }
      i++;
    }
  }

  /**
   * Recoleccion de anillo
   */
  collectRing(ring) {
    this.ringSound.play();
    this.timeout = this.timeout + 5;
    this.ringsCount++;
    this.ringCount.innerHTML = this.ringsCount;
    this.scoreTotal = this.scoreTotal + 100;
    this.updateScore();

    // remover anillo del escenario
    this.gameContainer.removeChild(ring.container());

    // eliminar anillo del arreglo
    this.rings.splice(0, 1);
  }

  /**
   * @param {*} run div 1
   * @param {*} elem div 2
   * @returns superposicion entre dos divs
   *
   * para mejorar la jugabilidad no se considera el tamaño real de los div
   * se alteran las dimensiones reduciendolas
   * se logro no morir tan facilmente a costa de bajar la presicion de la deteccion de colisiones
   */
  detectCollision(run, elem) {
    let h =
      run.x - 5 < elem.x + elem.width + 5 && run.x + run.width - 30 > elem.x;
    let v =
      run.y + 10 < elem.y + elem.height - 10 &&
      run.y + run.height - 10 > elem.y;
    return h && v;
  }

  /**
   * fin del juego
   */
  lost() {
    // limpiar los loops
    clearInterval(this.loop);
    clearInterval(this.ringLoop);
    clearInterval(this.enemyLoop);
    clearTimeout(this.enemyWait);
    clearTimeout(this.ringWait);
    this.lostSound.play();
    this.timeout = 0;
    this.timer.innerHTML = "<h1>" + this.timeout + "</h1>";
    document.getElementById("scoreFinish").innerHTML = this.scoreTotal;
    document.getElementById("ringsTotal").innerHTML = this.ringsCount;

    // detener animaciones del escenario
    this.grass.style.animationPlayState = "paused";
    this.forest.style.animationPlayState = "paused";
    this.highland.style.animationPlayState = "paused";

    // mostrar animacion de muerte
    this.runner.stop();

    // esperar que termine la animacion de muerte
    setTimeout(() => {
      this.grass.style.display = "none";
      this.forest.style.display = "none";
      this.highland.style.display = "none";
      this.lostMenu.style.display = null;

      // remover enemigos del escenario
      this.enemies.forEach((enemy) => {
        enemy.stop();
        if (enemy.container().parentNode == this.gameContainer)
          this.gameContainer.removeChild(enemy.container());
      });

      // remover anillos del escenario
      this.rings.forEach((ring) => {
        ring.stop();
        if (ring.container().parentNode == this.gameContainer)
          this.gameContainer.removeChild(ring.container());
      });
    }, 1000);
  }

  // actualizar puntaje
  updateScore() {
    this.score.innerHTML = this.scoreTotal;
  }

  /**
   * ---------- creacion aleatoria anillos ------------
   */
  addRing() {
    if (!this.isMakeRing) {
      this.isMakeRing = true;
      let min = 3;
      let max = 10;
      // el tiempo de espera varia entre 3 y 10 segundos
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

    // al finalizar la animacion se remueve del escenario y del arreglo
    ring.container().addEventListener("animationend", () => {
      this.gameContainer.removeChild(ring.container());
      this.rings.splice(0, 1);
    });

    this.isMakeRing = false;
  }

  /**
   * ---------- creacion aleatoria enemigos ------------
   */
  addEnemy() {
    if (!this.isMakeEnemy) {
      this.isMakeEnemy = true;
      let min = 1;
      let max = 3;
      // el tiempo de espera varia entre 1 y 3 segundos
      let res = parseInt(Math.random() * (max - min) + 1);
      this.enemyWait = setTimeout(() => {
        this.makeEnemy();
      }, res * 900);
    }
  }

  makeEnemy() {
    let type = parseInt(Math.random() * 3) + 1;
    let enemy = new Enemy(type);
    this.enemies.push(enemy);
    this.gameContainer.appendChild(enemy.container());
    this.scoreTotal = this.scoreTotal + 5;
    this.updateScore();

    // al finalizar la animacion se remueve del escenario y del arreglo
    enemy.container().addEventListener("animationend", () => {
      this.gameContainer.removeChild(enemy.container());
      this.enemies.splice(0, 1);
    });
    this.isMakeEnemy = false;
  }

  /**
   * -------------- Timer --------------
   */
  timerGame() {
    this.timeout = this.timeout - 1;
    this.timer.innerHTML = "<h1>" + this.timeout + "</h1>";
    if (this.timeout < 0) {
      this.lost();
    } else {
      setTimeout(() => {
        this.timerGame();
      }, 1000);
    }
  }

  /**
   * -------------- Musica --------------
   */
  playSound() {
    this.gameMusic.loop = true;
    if (!this.gameMusic.paused) {
      this.btnMusic.src = "/img/SoundOff.png";
      this.gameMusic.pause();
      this.gameMusic.currentTime = 0;
      this.gameMusic.volume = 0;
      this.ringSound.volume = 0;
      this.lostSound.volume = 0;
    } else {
      this.btnMusic.src = "/img/SoundOn.png";
      this.gameMusic.volume = 0.1;
      this.ringSound.volume = 0.1;
      this.lostSound.volume = 0.1;
      this.gameMusic.play();
    }
  }
}
