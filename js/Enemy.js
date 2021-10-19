class Enemy extends Character {
  constructor(n, id) {
    let element = document.createElement("div");
    let type = "enemigo";
    let clss = type + n;

    // let speed = "4s";
    element.classList.add("elemento");
    element.classList.add("terrestre");
    
    if (n == 3) {
      let c = parseInt(Math.random() * 10) + 1;
      if (c % 2 == 0) {
        element.classList.remove("terrestre");
        element.classList.add("aereo");
        speed = "3s";
      }
    }
    
    element.classList.add(clss);
    super(element);
    // this.style = getComputedStyle(element);

    // let advance = `, advance ${speed} forwards linear`;
    
    // element.style.animation += advance;
    // this.animation = this.style.animation;
    // this.clss = clss;
    this.id = id;
  }

  getId() {
    return this.idset;
  }

  stop(){

    // let left = parseInt(this.status().x);
    // this.character.style.animation = null;
    // this.character.style.animation = this.animation;
    // this.character.style.left = left + "px";

  }
}
