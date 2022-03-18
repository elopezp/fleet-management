# Fleet management
Administrador de flota

Se desea conocer la ubicación de una flota de vehículos en 3 ciudades distintas.

Para ello se plantea realizar una aplicación en Django donde se pueda visualizar una pantalla donde se vean las ciudades en cuestión y los vehículos que se encuentran en ellas.

A la par, se plantea tener una api rest en la aplicación donde se pueden administrar los vehículos. De esta manera:
- Se puede crear, editar o eliminar los vehículos de la flota.
- Se puede listar los vehículos y su estado actual
- Se puede dar la instrucción de que un vehículo viaje a una ciudad determinada

Un vehículo tiene la siguiente información
- ID de Vehículo
- Ubicación actual
- Consumo de combustible (km/lt)
- Distancia recorrida
- Combustible consumido

Las ciudades tienen la siguiente distancia entre sí:

|| Ciudad A  | Ciudad B  | Ciudad C|
|---- |-----|-------|-------|
| Ciudad A|0|1|2|
| Ciudad B||0|4|
| Ciudad C|||0|

Al dar la instrucción de que un vehículo viaje a una ciudad se debe de actualizar su información. En particular sus atributos de distancia recorrida y combustible consumido.


## Instrucciones de descarga e instalación

* 1 - Abrir una terminal y clonar proyecto: `git clone https://github.com/elopezp/fleet-management.git`
* 2 - Ir al directorio de backend: `cd backend`
* 3 - Crear virtual environment:
_Linux y macOS_:
`python3 -m venv myenv`
_Windows_:
`py -m venv venv myenv`
* 4 - Activar virtual environment:
_Linux y macOS_:
`source myenv/bin/activate`
_Windows_:
`.\myenv\scripts\activate`
* 5 - Instalar paquetes necesarios con pip: `pip install -r requirements.txt`
* 6 - Crear esquema de base de datos: `python manage.py makemigrations && python manage.py migrate`
* 7 - Crear datos de inicio para las ciudades y la distancia entre ellas: `python manage.py loaddata initialdata.json`
Crear vehículos (opcional)
`python manage.py loaddata vehicles.json`
* 8 - Ejecutar servidor de desarrollo django: `python manage.py runserver`
* 9 - En otra terminal ir al directorio de frontend: `cd ../frontend`
* 10 - Instalar dependencias npm: `npm install`
* 11 - Ejecutar aplicación frontend en modo desarrollo: `npm run start`
* 12 - Abrir [http://localhost:3000](http://localhost:3000) para verse en un navegador.

## Tecnologías usadas

[Django](https://www.djangoproject.com/), [Django REST Framework](https://www.django-rest-framework.org/),[React](https://reactjs.org/),[React Redux](https://react-redux.js.org/),[React-bootstrap](https://react-bootstrap.github.io/),[React intl ](https://formatjs.io/docs/getting-started/installation/)