class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador , x, y);
        this.disparos = 5;
        this.vida = 3;
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY
        // Disparo
        this.cadenciaDisparo = 30;
        this.tiempoDisparo = 0;

    }

    actualizar(){
        // Tiempo Disparo
        if ( this.tiempoDisparo > 0 ) {
            this.tiempoDisparo--;
        }

        this.x = this.x + this.vx;
        this.y = this.y + this.vy;
    }


    moverX (direccion){
        this.vx = direccion * 3;
    }

    moverY (direccion){
        this.vy = direccion * 3;
    }

    disparar(){
        if ( this.tiempoDisparo == 0 && this.disparos>0) {
            // reiniciar Cadencia
            this.tiempoDisparo = this.cadenciaDisparo;
            this.disparos--;
            return new DisparoJugador(this.x, this.y);
        } else {
            return null;
        }
    }

    reducirVida(){
        this.vida--;
    }



}
