# metroidQuintus
Developing metroid using Quintus


Diseño del Juego

    Metroid es un videojuego del género acción y aventura no lineal y la primera entrega de la serie de videojuegos de Metroid lanzado en 1986 para NES (Nintendo Entetertainment System). Este juego dio nombre posteriormente al género Metroidvania.

    -Ambientación

    Los metroids —las criaturas más peligrosas de la galaxia— han caído en manos de los Piratas Espaciales. Eres la cazarrecompensas Samus Aran y debes adentrarte hasta las profundidades del planeta Zebes para eliminar al líder de los Piratas Espaciales, Mother Brain, y traer la paz a la galaxia.

    -Elementos imporantes del mapa
        Puertas: Las puertas sirven para cambiar de mapa, se pueden atravesar en ambas direcciones y deben ser abiertas por disparos.

            -Puertas Amarillas (bloqueo) -> No pueden abrirse.
            -Puertas Azules (básicas) -> Deben abrirse con disparos normales.
            -Puertas Rojas (avanzadas) -> Deben abrirse con misiles.


Objetivo del Juego
        
        El objetivo principal del juego es matar a Mother Brain (enemigo final) y escapar del planeta antes de que explote la bomba.
        Como jugador perderás cuando Samus pierda toda su energia.
        Como jugador ganarás cuando derrotes a Mother Brain y logres escapar del planeta antes de que un contador llegue a cero.

Mecánicas

    Inicialmente Samus podrá moverse a izquierda y derecha, saltar hacia arriba, izquierda o derecha. 

        El movimiento se realiza con las flechas del teclado.
        El salto se ejecuta con la tecla space.
    
    Samus tiene que defenderse por lo que inicialmente tambien podrá disparar balas normales. Con estas balas Samus también podrá abrir las puertas azules. Samus puedes apuntar hacia su izquierda, derecha y hacia arriba.
    
         El disparo se ejecuta con la tecla S.

    Samus puede encontrar distintas mejoras en su aventura que le permitiran avanzar explorando las zonas:

        -Morphball: Samus podra desplazarse y saltar en forma de bola, esto puede ser útil para acceder a zonas del mapa que la corpulenta Samus inicialmente no puede.

        Se activa/desactiva pulsando la flecha hacia abajo.

        -Rayo de Hielo: Samus podrá disparar disparos que congelen a los enemigos.

        Podras usar el rayo de hielo con la tecla de disparo (S).
      
        -Supersalto: Samus podra saltar casi el doble de lo normal.

         Podras usar el supersalto con la tecla de salto (space).

        -SuperTraje(oculto/opcional): El traje se activa automáticamente y concederá a samus mas resistencia. Se encuentra oculto en una de las salas del mapa.

        -Misiles: Samus podrá disparar misiles causando así mas daños en los enemigos (x2) . Esto también le permite a Samus abrir puertas rojas.

        El cambio de arma se ejecuta pulsando la tecla D, de esta manera podrás utilizar los misiles.

    Samus puede encontrar distintos consumibles como recompensa de haber matado un enemigo o explorando las zonas:

        -Munición: Samus recarga una cantidad suficiente como para poder terminar su aventura.
        -Vida: Samus recupera cinco puntos de vida.


Diseño de la Implementación

    Para la realización de este Metroid se usado el motor Quintus.

    El comportamiento del personaje principal esta definido en "samus.js". Este puede correr, saltar, disparar ( balas normales,balas congelantes y misiles) y convertirse en bola.

    Los diferentes tipos de disparo que puede usar samus se pueden encontrar en la carpeta shootTypes:

        bullet.js    -> Bala normal
        iceBullet.js -> Bala congelante
        missile.js   -> Misil

    Los distintos enemigos se encuentran la carpeta enemies :
        dessagega.js
        geruta.js
        metroid.js
        skree.js
        zommer.js
        zebetite.js
        waver.js
        motherBrain.js

    En dichos archivos se define entre otras cosas la vida, el movimiento y las colisiones con Samus.

    En la carpeta enemies también podemos encontrar la explosion que generan algunos enemigos al morir ( explosion.js ) y la lava de ciertas partes del mapa que inflige daño a Samus(lava.js).

    La escena level 1 inicializa el juego y las caracteristicas iniciales de Samus ( estado de las mejoras de samus ). Se encuentra en el archivo game.js.

    Las escenas que corresponden a ganar/perder el juego estan definidas en el archivo game.js.

    La lógica de transicciones entre puertas esta definida en el archivo transicion.js dentro de la carpeta utils

    La escena hud define los distintos elementos del HUD del juego:  la energia restante, los misiles disponibles y el temporizador de la bomba. La lógica correspondiente al hud se puede encontrar en el archivo hud.js dentro de la carpeta UI.

    Hemos utilizados diferentes animaciones que afectan a Samus, los enemigos, las diferentes balas, los misiles y algunos elementos del mapa como el movimiento de la lava. Estas animaciones estan definidas en el Q.load() dentro del game.js.

URL Gameplay ( Youtube )

    https://youtu.be/W26JfZRaQtc
    

Obsevaciones del video de gameplay

    En algunas partes del video se ha incrementado la velocidad de reproducción para poder comprimir una partida completa finalizada.
    Se muestran las principales mecánicas a velocidad de reproducción normal, el comportamiento de diferentes enemigos y el comienzo y final del juego.
    También se muestra la sala secreta para reducir el tiempo de gameplay. Si no accedieras a esta sala tendrías que explorar la zona para conseguir el rayo de hielo.

Equipo de trabajo y reparto de tareas

    Alonso Martin Zurdo     40%
    Pedro Sánchez Escribano 30%
    Alvaro Penalva Alberca  30%