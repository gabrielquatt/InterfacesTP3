class Character {
  // character es un elemento html
  constructor(character) {
    this.character = character;
  }

  container() {
    return this.character;
  }

  status() {
    return this.character.getBoundingClientRect();
  }
  
  stop(){
    this.character.style.animationPlayState = 'paused';
  }
}
