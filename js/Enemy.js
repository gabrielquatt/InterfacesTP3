class Enemy extends Character {
  // param n: define el tipo de enemigo
  constructor(n) {
    let element = document.createElement("div");
    let type = "enemigo";
    let clss = type + n;
    element.classList.add("elemento");
    element.classList.add("terrestre");

    // el enemigo 3 es aereo
    if (n == 3) {
      element.classList.remove("terrestre");
      element.classList.add("aereo");
    }

    element.classList.add(clss);
    super(element);
  }
}
