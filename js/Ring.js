class Ring extends Character {
  constructor() {
    let element = document.createElement("div");
    element.classList.add("elemento");
    element.classList.add("moneda");
    let c = parseInt(Math.random() * 10) + 1;
    if (c % 2 == 0) {
      element.classList.add("terrestre");
    } else {
      element.classList.add("aereo");
    }
    super(element);
  }
}
