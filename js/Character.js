class Character {
  // character es un elemento html
  constructor(character) {
    this.character = character;
  }

  container() {
    return this.character;
  }

  status() {
    const rect = this.character.getBoundingClientRect();
    return {
      left: parseInt(rect.left + window.scrollX),
      top: parseInt(rect.top + window.scrollY),
      right: parseInt(rect.right + window.scrollX),
      height: parseInt(rect.height),
    };
  }
}
