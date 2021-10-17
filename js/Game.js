class Game {
    constructor(){
        this.runner = new Runner();
        this.jump = false;
        this.init();

    }

    init(){
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 38) {
                this.runner.jump();
                this.jump = true;
            }
        });
        window.addEventListener('keyup', (e) => {
            if (e.keyCode === 38) {
                this.jump = false;
            }
        });
    }
}