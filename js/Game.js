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
      if (e.keyCode === 38) {
        this.runner.jump();
        this.jump = true;
      }
    });
    window.addEventListener("keyup", (e) => {
      if (e.keyCode === 38) {
        this.jump = false;
      }
    });

    setInterval(this.addEnemy.bind(this), 1000);
  }

  addEnemy() {
    if (!this.isMakeEnemy) {
      this.isMakeEnemy = true;
      let min = 1;
      let max = 5;

      let res = parseInt(Math.random() * (max - min) + 1);
      setTimeout(() => {
        this.makeEnemy();
        this.isMakeEnemy = false;
      }, res * 1000);
    }
  }

  makeEnemy() {
    let type = "enemigo1";
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
