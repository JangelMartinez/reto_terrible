Para el reto he dejado en la carpeta ./plantillas el archivo original terrible.js.

He creado nuevos ficheros en la carpeta ./plantillas con el nombre terrible2.js y terrible3.js.
También he creado dentro de la carpeta ./tests el archivo de test terrible.test.js

En los tres ficheros he modificado la función processEpisodes() para que devuelva un objeto con los valores sacados por consola y sea más fácil de testear.

Archivo terrible2.js
---
El archivo está modificado para que elimine los episodios que no tienen el atributo number y se trabaja directamente con el nuevo array creado para los episodios que si tienen dicho atributo

Archivo terrible3.js
---
El archivo está modificado para no eliminar ningún episodio. Siguiendo lo siguiente:
- Aleatoriamente se va añadiendo un número al atributo number siguiendo el patrón de los números que se han encontrado:

Ej: si se encuentra el patrón siguiente [219, 222, 223, 225] se irán añadiendo los números intermedios que faltan como el 220, 221, 224, ..

- Con los episodios que si tienen el atributo duration, se crea una media. Al episodio que no tiene dicho atributo se le añade asignandole la media calculada. Así siempre dispondremos del episodio con menos duración.

También en caso de tener el atributo supercoco y no tener el atributo duration, se crea el atributo duration y se le asigna el valor del atributo supercoco

- Con los episodios que no tienen el atributo title, se le crea un titulo adjuntandole el número del atributo number que le hemos creado anteriormente si no lo tenia

Archivo de test terrible.test.js
---

Se ha creado unos test en lo que se puede comprobar que la recogida de datos en la función fetchEpisodes() no pasa los test en caso de que no exista alguno de los atributos o aparece el atributo supercoco.

También hay tests para la processEpisodes() donde se comprueba que no haya en los valores devueltos ningún Nan o undefined.

Se han añadido 3 imports: uno por cada plantilla.
Se puede comprobar que utilizando la plantilla terrible.js, al testear da errores con la API de terrible.
Con la plantilla terrible2.js, al testear solo puede aparecer con error el test de supercoco ya que con el código modificado se ha arreglado los posibles fallos.
Con la plantilla terrible3.js, al testear solo puede aparecer con error el test de supercoco ya que con el código modificado se ha arreglado los posibles fallos.

