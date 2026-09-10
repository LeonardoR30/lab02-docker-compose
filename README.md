# lab02-docker-compose## Comandos de despliegue

Clonar el repositorio y crear el archivo `.env` en la raíz (basado en `.env.example`):

POSTGRES_USER=admin
POSTGRES_PASSWORD=leonardo2026
POSTGRES_DB=labdb

Levantar el stack (build local de las 3 APIs + Postgres):

bash
docker compose up -d --build


Verificar el estado de los contenedores:

ash
docker compose ps

Probar cada instancia de la API:

bash
curl localhost:3001
curl localhost:3002
curl localhost:3003


Detener y eliminar contenedores, red y volumen:

bash
docker compose down -v

## Tipos de redes en Docker

Docker maneja varios tipos de red según lo que necesites:

- **bridge**: es la red que se crea por defecto. Cuando corres un contenedor sin decirle qué red usar, cae aquí. Los contenedores dentro de la misma red bridge se pueden comunicar entre sí, y es justo la que usamos en este proyecto: docker compose crea una bridge automáticamente para que las APIs y la base de datos se hablen entre ellas.
- **host**: en este caso el contenedor no tiene su propia red, usa directamente la del servidor donde corre. Por eso no hay que mapear puertos, el contenedor "es" el host en términos de red.
- **none**: básicamente el contenedor queda sin red, aislado por completo, sin acceso a internet ni a otros contenedores.
- **overlay**: se usa cuando tienes varios servidores trabajando juntos (Docker Swarm), y necesitas que contenedores en máquinas distintas se comuniquen como si estuvieran en la misma red.
- **macvlan**: le da al contenedor su propia dirección MAC, como si fuera un dispositivo físico más conectado a la red, en lugar de estar "detrás" del host.

## Tipos de volúmenes en Docker

Para que los datos no se pierdan al borrar un contenedor, Docker ofrece distintas formas de guardar información:

- **Volúmenes con nombre (named volumes)**: es la opción que usamos en este proyecto, para que los datos de Postgres sobrevivan aunque el contenedor se elimine. Docker se encarga de dónde y cómo se guardan, uno no tiene que preocuparse por la ruta exacta en el sistema.
- **Bind mounts**: aquí uno mismo elige una carpeta del sistema y la conecta directo con una carpeta del contenedor. Se usa mucho en desarrollo, porque si cambias un archivo en tu máquina, el contenedor lo ve al instante.
- **tmpfs mounts**: estos ni siquiera tocan el disco, todo se queda en la memoria RAM. Apenas se apaga el contenedor, esos datos desaparecen. Sirve para cosas temporales que no necesitas guardar.