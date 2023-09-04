# cecy-md-links

## Índice

* Preámbulo

* Acerca de cecy-md-links

* Como instalar md-links

* Como usar md-links

* Opciones de comandos

* Ejemplos de usabilidad

* Como desinstalar md-links

* Diagramas de flujo.

* Pistas, tips y lecturas complementarias 



## 1. Preámbulo

[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado
ligero muy popular entre developers. Es usado en muchísimas plataformas que
manejan texto plano (GitHub, foros, blogs, ...) y es muy común
encontrar varios archivos en ese formato en cualquier tipo de repositorio
(empezando por el tradicional `README.md`).

Estos archivos `Markdown` normalmente contienen _links_ (vínculos/ligas) que
muchas veces están rotos o ya no son válidos y eso perjudica mucho el valor de
la información que se quiere compartir.

Dentro de una comunidad de código abierto, nos han propuesto crear una
herramienta usando [Node.js](https://nodejs.org/), que lea y analice archivos
en formato `Markdown`, para verificar los links que contengan y reportar
algunas estadísticas.

## Acerca de cecy-md-links
Con cecy-md-links como librería puedes validar fácilmente en tus archivos y/o directorios la presencia de links, estatus de una manera fácil y colorida

## Como instalar md-links
Para instalar Md-links solo debes escribir en la terminal el siguiente comando:

npm i md-links


## Cómo usar cecy-md-links
* En la consola agrega lo siguiente:

 md-links + La ruta relativa del archivo, ejemplo: ./nombredeCarperta + Opciones de comandos


## Opciones de comandos:

(--validate o --v )  Para ver enlaces de validación, realiza una solicitud HTTP para saber si el enlace funciona o no.

( --validate o --stats/ --v o --s )  Para ver estadísticas sobre enlaces : total, unicos, y rotos.

(--stats o --s ) Para ver estadísticas sobre enlaces.


(--help o --h)  Para ver el menú que muestra todos los comandos.



## Ejemplos de usabilidad

* Agragando ruta y opción
![md-links-archivo-opción](<images/Captura de pantalla 2023-09-04 094043.png>)
* Sin archivo ni opciones
![Si no ingresas nada](<images/Captura de pantalla 2023-09-04 094252.png>)
* Si se ingresa una ruta inválida
![Si ingresas una ruta inválida](<images/Captura de pantalla 2023-09-04 094259.png>)


## Como desinstalar md-links
Para desinstalar cecy-md-links sólo debes ingresar en la terminal en la ubicación del archivo donde la has instalado el siguiente comando:

npm uninstall -D md-links

## Diagramas de flujo.
![Diagrame de flujo](<images/Captura de pantalla 2023-08-14 151138.png>)

## Pistas, tips y lecturas complementarias 

* [learnyounode](https://github.com/workshopper/learnyounode)
* [how-to-npm](https://github.com/workshopper/how-to-npm)
* [promise-it-wont-hurt](https://github.com/stevekane/promise-it-wont-hurt)

Otros recursos

* [Acerca de Node.js - Documentación oficial](https://nodejs.org/es/about/)
* [Node.js file system - Documentación oficial](https://nodejs.org/api/fs.html)
* [Node.js http.get - Documentación oficial](https://nodejs.org/api/http.html#http_http_get_options_callback)
* [Node.js - Wikipedia](https://es.wikipedia.org/wiki/Node.js)
* [What exactly is Node.js? - freeCodeCamp](https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5)
* [¿Qué es Node.js y para qué sirve? - drauta.com](https://www.drauta.com/que-es-nodejs-y-para-que-sirve)
* [¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube](https://www.youtube.com/watch?v=WgSc1nv_4Gw)
* [¿Simplemente qué es Node.js? - IBM Developer Works, 2011](https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html)
* [Node.js y npm](https://www.genbeta.com/desarrollo/node-js-y-npm)
* [Asíncronía en js](https://carlosazaustre.es/manejando-la-asincronia-en-javascript)
* [NPM](https://docs.npmjs.com/getting-started/what-is-npm)
* [Publicar packpage](https://docs.npmjs.com/getting-started/publishing-npm-packages)
* [Crear módulos en Node.js](https://docs.npmjs.com/getting-started/publishing-npm-packages)
* [Leer un archivo](https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)
* [Leer un directorio](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)
* [Path](https://nodejs.org/api/path.html)
* [Linea de comando CLI](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e)

