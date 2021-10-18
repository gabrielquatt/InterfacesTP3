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
    this.score = document.getElementById("score");
  }

  init() {
    this.gameContainer.appendChild(this.runner.container());
    this.updateScore();
    setInterval(this.addEnemy.bind(this), 1000); // loop para crear enemigos
    setInterval(this.addRing.bind(this), 1000); // loop para crear monedas
    setInterval(this.gameLoop.bind(this), 20); // loop para controlar estado del juego
  }

  gameLoop() {
    let runnerStatus = this.runner.status();

    // verificar monedas
    this.rings.forEach((ring) => {
      let ringStatus = ring.status();
      if (this.detectCollision(runnerStatus, ringStatus)) {
        this.updateScore();
        this.gameContainer.removeChild(ring.container());
        this.rings.splice(0, 1);
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

  /**
   * https://stackoverflow.com/questions/9768291/check-collision-between-certain-divs
   * @param {*} run div 1
   * @param {*} elem div 2
   * @returns superposicion entre dos divs
   */
  detectCollision(run, elem) {
    let h = run.x < elem.x + elem.width && run.x + run.width > elem.x;
    let v = run.y < elem.y + elem.height && run.y + run.height > elem.y;
    return h && v;
  }

  lost() {
    console.log("lost");
  }

  updateScore() {
    this.score.innerHTML = this.ringsCount++;
  }

  addRing() {
    if (!this.isMakeRing) {
      this.isMakeRing = true;
      let min = 3;
      let max = 10;
      let res = parseInt(Math.random() * (max - min) + min);

      setTimeout(() => {
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

      setTimeout(() => {
        this.makeEnemy();
      }, res * 1000);
    }
  }

  makeEnemy() {
    let type = parseInt(Math.random() * 3) + 1;
    let enemy = new Enemy(type, this.enemyCount);
    this.enemies.push(enemy);
    this.enemyCount++;
    this.gameContainer.appendChild(enemy.container());

    enemy.container().addEventListener("animationend", () => {
      this.gameContainer.removeChild(enemy.container());
      this.enemies.splice(0, 1);
    });

    this.isMakeEnemy = false;
  }
}
