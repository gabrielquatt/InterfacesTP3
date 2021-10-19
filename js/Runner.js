class Runner extends Character {
  constructor() {
    super( document.getElementById("sonic"));
    this.run();
  }

  run() {
    this.character.classList.add("walk");
  }

  jump() {
    this.character.classList.remove("walk");
    this.character.classList.add("jump");
    setTimeout(this.fell.bind(this), 600);
  }

  fell() {
    this.character.classList.remove("jump");
    this.character.classList.add("walk");
  }
}
