class Game {
  constructor() {
    this.runner = new Runner();
    this.jump = false;
    this.isMakeEnemy = false;
    this.enemies = [];
    this.enemyCount = 0;
    this.gameContainer = document.getElementById("gameContainer");
  }

  init() {
    window.addEventListener("keydown", (e) => {
      if (!this.jump) {
        if (e.keyCode === 38) {
          this.runner.jump();
          this.jump = true;
        }
      }
    });
  
    window.addEventListener("keyup", (e) => {
      if (e.keyCode === 38) {
        this.jump = false;
      }
    });

    this.gameContainer.appendChild(this.runner.container());
    setInterval(this.addEnemy.bind(this), 1000); // loop para crear enemigos

    setInterval(this.gameLoop.bind(this), 20); // loop para controlar estado del juego
  }

  gameLoop() {
    let runnerStatus = this.runner.status();

    this.enemies.forEach((enemy) => {
      let enemyStatus = enemy.status();

      if (
        enemyStatus.left < runnerStatus.right &&
        enemyStatus.left > runnerStatus.left &&
        runnerStatus.top >= enemyStatus.top - runnerStatus.height
      ) {
        this.lost();
      }
    });
  }

  lost() {
    
  }

  addEnemy() {
    if (!this.isMakeEnemy) {
      this.isMakeEnemy = true;
      let min = 1;
      let max = 3;
      let res = parseInt(Math.random() * (max - min) + 1);

      setTimeout(() => {
        this.makeEnemy();
        this.isMakeEnemy = false;
      }, res * 1000);
    }
  }

  makeEnemy() {
    let type = "enemigo";
    type += parseInt(Math.random() * 3) + 1;
    let enemy = new Enemy(type, this.enemyCount);
    this.enemies.push(enemy);
    this.enemyCount++;
    this.gameContainer.appendChild(enemy.container());
    enemy.container().addEventListener("animationend", () => {
      this.gameContainer.removeChild(enemy.container());
      this.enemies.splice(0, 1);
    });
  }
}
