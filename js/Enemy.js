class Enemy extends Character {
  // param n: define el tipo de enemigo
  constructor(n) {
    let element = document.createElement("div");
    let type = "enemigo";
    let clss = type + n;
    element.classList.add("elemento");
    element.classList.add("terrestre");
    let r = Math.random();

    // el enemigo 3 tiene 30% de probabilidades de ser terrestre
    if (n == 3 && r > 0.3) {
      element.classList.remove("terrestre");
      element.classList.add("aereo");
    }

    element.classList.add(clss);
    super(element);
  }
}
