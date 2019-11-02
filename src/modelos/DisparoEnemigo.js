class DisparoEnemigo extends Modelo {

    constructor(x, y, vx) {
        super(imagenes.disparo_enemigo, x, y)
        this.vx = vx;
    }

    actualizar (){
        this.x = this.x - this.vx;
    }

}