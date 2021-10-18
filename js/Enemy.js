class Enemy {
  constructor(type, id) {
    this.element = document.createElement("div");
    this.element.classList.add(type);
    this.id = id;
  }

  container() {
    return this.element;
  }

  getId() {
    return this.id;
  }
}
