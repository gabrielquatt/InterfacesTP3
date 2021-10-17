class Runner {
  const 
  constructor() {
    this.character = document.getElementById("sonic");
    this.run();
  }

  run(){
    this.character.classList.add("walk");
  }

  jump() {
    this.character.classList.remove("walk");
    this.character.classList.add("jump");
    setTimeout(this.fell.bind(this), 1000);
  }

  fell() {
    this.character.classList.remove("jump");
    this.character.classList.add("walk");
  }
}
