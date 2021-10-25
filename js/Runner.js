class Runner extends Character {
  constructor() {
    let element = document.createElement("div");
    element.classList.add("sonic");
    super(element);
    this.isJumping = false;

    window.addEventListener("keydown", (e) => {
      this.jump(e);
    });

    window.addEventListener("keypress", (e) => {
      this.jump(e);
    });

    this.character.addEventListener("animationend", () => {
      this.fell();
    });

    this.run();
  }

  run() {
    this.character.classList.add("walk");
  }

  jump(e) {
    if (!this.isJumping) {
      if (e.keyCode === 38) {
        this.character.classList.remove("walk");
        this.character.classList.add("jump");
        this.isJumping = true;
      }
    }
  }

  fell() {
    this.character.classList.remove("jump");
    this.run();
    setTimeout(() => {
      this.isJumping = false;
    }, 10);
  }

  stop(){
    this.character.classList.remove("jump");
    this.character.classList.remove("walk");
    this.character.classList.add("death");
  }
}
