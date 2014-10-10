<h1>GameCycle</h1>

El proposito de este proyecto es dar una ayuda para entender la estructura básica de un juego sobre canvas y Javascript.

<h3>Canvas</h3>
- Elemento HTML.
- Bajo nivel, esta diseñado para dibujar y no para animar.
- Es necesario dibujar múltiples veces cada segundo, para lograr dar la impresión de movimiento.
- Por ello en los juegos se implementa un loop, donde se redibuja el canvas en cada iteración.

<h3>Orden del game loop</h3>

Los pasos del loop se deben ejecutar en orden síncrono.

- Actualizar las variables del juego.
- Borrar el canvas.
- Dibujar los elementos del juego en orden (ej: primero el fondo, luego el mapa, luego los personajes, luego el UI, etc).