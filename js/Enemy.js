class Enemy extends Character {
  constructor(n, id) {
    let element = document.createElement("div");
    let type = "enemigo";
    let clss = type + n;

    // let speed = "4s";
    element.classList.add("elemento");
    element.classList.add("terrestre");
    
    if (n == 3) {
      element.classList.remove("terrestre");
      element.classList.add("aereo");
    }
    
    element.classList.add(clss);
    super(element);
    this.id = id;
  }

  getId() {
    return this.idset;
  }

}
