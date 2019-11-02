class GameLayer extends Layer {

    constructor() {
        super();
        this.iniciar();
    }

    iniciar() {
        this.jugador = new Jugador(50, 50);
        this.fondo = new Fondo(imagenes.fondo,480*0.5,320*0.5);

        this.disparosJugador = [];
        this.disparosEnemigo = [];

        this.enemigos = [];
        this.enemigos.push(new EnemigoPlataforma(300,50));
        this.enemigos.push(new EnemigoPlataforma(350,200));
        this.enemigos.push(new EnemigoOvni(-200,150));
        this.enemigos.push(new EnemigoOvni(-50,225));

        this.bombas = [];
        this.monedas = [];

        this.elementosRecolectables = [];

        this.fondoPuntos =
            new Fondo(imagenes.icono_puntos, 480*0.85,320*0.05);

        this.fondoVida =
            new Fondo(imagenes.icono_vida, 480*0.50,320*0.05);

        this.puntos = new Texto(0,480*0.9,320*0.07 );
        this.vidaJugador = new Texto(0,480*0.6,320*0.07 );
        this.vidaJugador.valor = 3;

    }

    actualizar (){

        this.fondo.vx = -1;
        this.fondo.actualizar();

        console.log("disparosJugador: "+this.disparosJugador.length);
        // Eliminar disparos fuera de pantalla
        for (var i=0; i < this.disparosJugador.length; i++){
            if ( this.disparosJugador[i] != null &&
                !this.disparosJugador[i].estaEnPantalla()){

                this.disparosJugador.splice(i, 1);
                i=i-1;
            }
        }

        console.log("disparosEnemigo: "+this.disparosEnemigo.length);
        // Eliminar disparos fuera de pantalla
        for (var i=0; i < this.disparosEnemigo.length; i++){
            if ( this.disparosEnemigo[i] != null &&
                !this.disparosEnemigo[i].estaEnPantalla()){

                this.disparosEnemigo.splice(i, 1);
                i=i-1;
            }
        }

        // Generar Enemigos
        if (this.iteracionesCrearEnemigos == null){
            this.iteracionesCrearEnemigos = 0;
        }
        // iteracionesCrearEnemigos tiene que ser un número
        this.iteracionesCrearEnemigos --;

        if ( this.iteracionesCrearEnemigos < 0){
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.enemigos.push(new EnemigoPlataforma(rX,rY));
            rX = -(Math.random() * (600 - 500) + 500);
            rY = (Math.random() * (300 - 60) + 60);
            this.enemigos.push(new EnemigoOvni(rX,rY))
            this.iteracionesCrearEnemigos = 110;
        }

        // Generar Bombas
        if (this.iteracionesCrearBombas == null){
            this.iteracionesCrearBombas = 0;
        }

        this.iteracionesCrearBombas --;

        if ( this.iteracionesCrearBombas < 0){
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.bombas.push(new Bombas(rX,rY));
            this.iteracionesCrearBombas = 300;
        }

        // Generar Monedas
        if (this.iteracionesCrearMonedas == null){
            this.iteracionesCrearMonedas = 0;
        }

        this.iteracionesCrearMonedas --;

        if ( this.iteracionesCrearMonedas < 0){
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.monedas.push(new Monedas(rX,rY));
            this.iteracionesCrearMonedas = 100;
        }

        // Generar Elemento Recolectable
        if (this.iteracionesCrearPowerUp == null){
            this.iteracionesCrearPowerUp = 0;
        }

        this.iteracionesCrearPowerUp --;

        if ( this.iteracionesCrearPowerUp < 0){
            var rX = Math.random() * (600 - 500) + 500;
            var rY = Math.random() * (300 - 60) + 60;
            this.elementosRecolectables.push(new ElementoRecolectable(rX,rY));
            this.iteracionesCrearPowerUp = 250;
        }

        // Generar DisparosEnemigos
        for (var i=0; i < this.enemigos.length; i++){
            var nuevoDisparo = this.enemigos[i].disparar(this.enemigos[i].vxDisparo);
            if ( nuevoDisparo != null && this.enemigos[i].estaEnPantalla()) {
                this.disparosEnemigo.push(nuevoDisparo);
            }
        }

        this.jugador.actualizar();

        for (var i=0; i < this.enemigos.length; i++) {
            this.enemigos[i].actualizar();
        }

        for (var i=0; i < this.bombas.length; i++) {
            this.bombas[i].actualizar();
        }

        for (var i=0; i < this.monedas.length; i++) {
            this.monedas[i].actualizar();
        }

        for (var i=0; i < this.elementosRecolectables.length; i++) {
            this.elementosRecolectables[i].actualizar();
        }

        for (var i=0; i < this.disparosEnemigo.length; i++) {
            this.disparosEnemigo[i].actualizar();
        }

        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].actualizar();
        }


        // A partir de aquí solo hago colisiones

        // colisiones, jugador - enemigos
        for (var i=0; i < this.enemigos.length; i++){
            if ( this.jugador.colisiona(this.enemigos[i])){
                this.jugador.reducirVida();
                this.enemigos.splice(i, 1);
                i = i-1;
                this.vidaJugador.valor--;

                if(this.jugador.vida<=0){
                    this.iniciar();
                }
            }
        }

        // colisiones , disparoJugador - enemigo
        for (var i=0; i < this.disparosJugador.length; i++){
            for (var j=0; j < this.enemigos.length; j++){
                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {

                    this.enemigos[j].reducirVida();
                    this.disparosJugador.splice(i, 1);
                    i = i-1;

                    if(this.enemigos[j].vida<=0){
                        this.enemigos.splice(j, 1);
                        j = j-1;
                        this.puntos.valor++;
                        this.jugador.disparos++;
                    }
                }
            }
        }

        // colisiones , jugador - Bomba
        for (var i=0; i < this.bombas.length; i++){
            if ( this.jugador.colisiona(this.bombas[i])){
                this.puntos.valor += this.enemigos.length;
                this.enemigos = [];
                this.disparosEnemigo = [];
                this.bombas.splice(i, 1);
                i = i-1;
            }
        }

        // colisiones , jugador - Monedas
        for (var i=0; i < this.monedas.length; i++){
            if ( this.jugador.colisiona(this.monedas[i])){
                this.puntos.valor+=2;
                this.monedas.splice(i, 1);
                i = i-1;
            }
        }

        // colisiones , jugador - Elemento recolectable
        for (var i=0; i < this.elementosRecolectables.length; i++){
            if (this.elementosRecolectables[i] != null &&
                this.elementosRecolectables[i].colisiona(this.jugador)) {

                this.elementosRecolectables.splice(i, 1);
                i = i-1;
                this.jugador.disparos+=10;
            }
        }

        // colisiones , disparoEnemigo - jugador
        for (var i=0; i < this.disparosEnemigo.length; i++){
            if ( this.jugador.colisiona(this.disparosEnemigo[i])){
                this.disparosEnemigo.splice(i, 1);
                i = i-1;
                this.jugador.reducirVida();
                this.vidaJugador.valor--;

                if(this.jugador.vida<=0){
                    this.iniciar();
                }
            }
        }


    }

    dibujar (){
        this.fondo.dibujar();
        for (var i=0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar();
        }

        for (var i=0; i < this.disparosEnemigo.length; i++) {
            this.disparosEnemigo[i].dibujar();
        }

        this.jugador.dibujar();
        for (var i=0; i < this.enemigos.length; i++){
            this.enemigos[i].dibujar();
        }
        for (var i=0; i < this.bombas.length; i++){
            this.bombas[i].dibujar();
        }

        for (var i=0; i < this.monedas.length; i++){
            this.monedas[i].dibujar();
        }

        for (var i=0; i < this.elementosRecolectables.length; i++){
            this.elementosRecolectables[i].dibujar();
        }

        this.fondoPuntos.dibujar();
        this.puntos.dibujar();
        this.fondoVida.dibujar();
        this.vidaJugador.dibujar();
    }

    procesarControles( ){
        // disparar
        if (  controles.disparo ){
            var nuevoDisparo = this.jugador.disparar();
            if ( nuevoDisparo != null ) {
                this.disparosJugador.push(nuevoDisparo);
            }
        }

        // Eje X
        if ( controles.moverX > 0 ){
            this.jugador.moverX(1);

        }else if ( controles.moverX < 0){
            this.jugador.moverX(-1);

        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if ( controles.moverY > 0 ){
            this.jugador.moverY(-1);

        } else if ( controles.moverY < 0 ){
            this.jugador.moverY(1);

        } else {
            this.jugador.moverY(0);
        }

    }


}
