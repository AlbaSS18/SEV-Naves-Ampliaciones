class EnemigoBase extends Modelo {

    constructor(imagen, x, y) {
        super(imagen, x, y)

        this.vy = 0;
        this.vx = 1;

        // Disparo
        this.cadenciaDisparo = 100;
        this.tiempoDisparo = 0;
    }

    reducirVida (){
        this.vida--;
    }

    disparar(vx){
        if ( this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            return new DisparoEnemigo(this.x, this.y, vx);
        } else {
            return null;
        }
    }


}