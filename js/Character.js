class Character {
  // character es un elemento html
  constructor(character) {
    this.character = character;
  }

  // elemento HTML 
  container() {
    return this.character;
  }

  // datos de posicion
  status() {
    return this.character.getBoundingClientRect();
  }
  
  // pausar animacion
  stop(){
    this.character.style.animationPlayState = 'paused';
  }
}
