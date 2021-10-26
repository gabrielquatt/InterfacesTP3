class Ring extends Character {
  constructor() {
    let element = document.createElement("div");
    element.classList.add("elemento");
    element.classList.add("anillo");
    let c = parseInt(Math.random() * 10) + 1;

    // el anillo tiene 50% de probabilidades de estar en el suelo
    if (c % 2 == 0) {
      element.classList.add("terrestre");
    } else {
      element.classList.add("aereo");
    }
    super(element);
  }
}
