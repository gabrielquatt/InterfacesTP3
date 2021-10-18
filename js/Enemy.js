class Enemy extends Character{
  constructor(type, id) {
    let element = document.createElement("div");
    element.classList.add("enemigo");
    element.classList.add(type);
    super(element);
    this.id = id;
  }

  getId() {
    return this.idset;
  }

}
