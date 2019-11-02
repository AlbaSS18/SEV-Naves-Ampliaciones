# SEV-Naves-Ampliaciones
Proyecto de Naves con ampliaciones para la asignatura de Software de Entretenimiento y Videojuegos de la Universidad de Oviedo hecho con 
JetBrains. Ampliaciones realizadas:

* **Nuevo tipo de enemigo**: lo más adecuado sería crear una clase base para que diferentes tipos de enemigos heredasen de ella. 
El nuevo enemigo debe tener diferente imagen y un patrón de movimiento distinto al enemigo actual.
* **Enemigos con capacidad de disparo**: Añadir a los enemigos la capacidad de disparar. 
Deben crear un disparo cada N iteraciones del juego. El disparo debe poder impactar al jugador.
* **Jugador con Vida**: El jugador debe tener vidas (inicialmente 3), cuando un enemigo colisiona con el jugador el juego no se reinicia, solo le reduce un punto de vida (y el enemigo se destruye).
La vida actual de la nave debe aparecer en pantalla (usar un control de texto o similar). Sí se ha implementado la ampliación (2) los disparos también deben afectar a la vida de la Nave.
* **Jugador con disparos finitos**: El jugador debe tener un número finito de disparos. Cada vez que elimina a un enemigo recupera un disparo. 
También debe incluirse un elemento “power up” que al colisionar con el jugador hace que este recuperé 10 disparos 
* **Monedas**: incluir un nuevo tipo de elemento que al colisionar con él nos permita sumar puntos o recuperar vida (cualquiera de las dos será válida)
* **Enemigos con vida ampliada**: debe ser necesario disparar 3 veces a un enemigo para eliminarlo. En caso de tener varios tipos de enemigos basta con que uno solo tenga vida ampliada.
* **Bombas**: al colisionar con este elemento se deben eliminar todos los Enemigos que haya en pantalla.
