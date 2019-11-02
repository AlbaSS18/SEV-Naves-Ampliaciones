class EnemigoOvni extends EnemigoBase {

    constructor(x, y) {
        super(imagenes.enemigo_pez, x, y)

        this.vida = 1;
        this.vxDisparo = -4;
    }

    actualizar (){

        if(this.tiempoDisparo>0){
            this.tiempoDisparo--;
        }
        this.vx = 1;
        this.x = this.x + this.vx;
    }
}