class Enemy extends Character {
  constructor(n, id) {
    let element = document.createElement("div");
    let type = "enemigo";
    let clss = type + n;
    element.classList.add("elemento");
    element.classList.add("terrestre");
   
    if (n == 3) {
      let c = parseInt(Math.random() * 10) + 1;
      if (c % 2 == 0) {
        element.classList.remove("terrestre");
        element.classList.add("aereo");
      }
    }

    element.classList.add(clss);
    super(element);
    this.id = id;
  }

  getId() {
    return this.idset;
  }
}
