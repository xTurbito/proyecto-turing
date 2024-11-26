🚀 Prueba Técnica - Turing IA

📌 Descripción General
La aplicación permite gestionar blogs y usuarios mediante un sistema de CRUD completo. Además, se implementó un sistema de roles para la asignación de permisos y acceso de los usuarios, especialmente enfocado en el inicio de sesión.

La arquitectura del proyecto se basa en APIs RESTful que facilitan la comunicación entre el frontend y el backend.

🛠️ Tecnologías Utilizadas
Frontend
React.js: Framework para la construcción de la interfaz de usuario.
React-Router-Dom: Manejo de rutas en la aplicación.
Axios: Librería para realizar peticiones HTTP.
DataTables: Implementación de tablas interactivas para mostrar datos de forma ordenada.


Backend
Node.js: Entorno de ejecución para el servidor.
Express.js: Framework para la creación de APIs RESTful.
Sequelize: ORM para la gestión de la base de datos.
MySQL: Base de datos relacional utilizada para almacenar la información.


📊 Estructura del Proyecto
Base de Datos
Se diseñaron y crearon las siguientes tablas en MySQL:

Blogs: Almacena los datos de los blogs publicados.
Usuarios: Gestiona la información de los usuarios del sistema.
Roles: Define los roles para controlar los permisos de acceso.

CRUD Implementado
Se desarrolló un CRUD completo (Crear, Leer, Actualizar y Eliminar) tanto para los blogs como para los usuarios, permitiendo una gestión eficiente de la información.


¡Entendido! Aquí tienes el README actualizado para incluir la funcionalidad de roles asignados a los usuarios para el inicio de sesión:

🚀 Prueba Técnica - Turing IA
Este repositorio contiene la solución para la prueba técnica solicitada por la compañía Turing IA. Es un proyecto fullstack que incluye tanto la gestión de datos en el backend como una interfaz de usuario interactiva en el frontend.

📌 Descripción General
La aplicación permite gestionar blogs y usuarios mediante un sistema de CRUD completo. Además, se implementó un sistema de roles para la asignación de permisos y acceso de los usuarios, especialmente enfocado en el inicio de sesión.

La arquitectura del proyecto se basa en APIs RESTful que facilitan la comunicación entre el frontend y el backend.

🛠️ Tecnologías Utilizadas
Frontend
React.js: Framework para la construcción de la interfaz de usuario.
React-Router-Dom: Manejo de rutas en la aplicación.
Axios: Librería para realizar peticiones HTTP.
DataTables: Implementación de tablas interactivas para mostrar datos de forma ordenada.
Backend
Node.js: Entorno de ejecución para el servidor.
Express.js: Framework para la creación de APIs RESTful.
Sequelize: ORM para la gestión de la base de datos.
MySQL: Base de datos relacional utilizada para almacenar la información.
📊 Estructura del Proyecto
Base de Datos
Se diseñaron y crearon las siguientes tablas en MySQL:

Blogs: Almacena los datos de los blogs publicados.
Usuarios: Gestiona la información de los usuarios del sistema.
Roles: Define los roles para controlar los permisos de acceso y administrar la autenticación de los usuarios.
CRUD Implementado
Se desarrolló un CRUD completo (Crear, Leer, Actualizar y Eliminar) tanto para los blogs como para los usuarios, permitiendo una gestión eficiente de la información.

Asignación de Roles a Usuarios
Los usuarios pueden tener roles asignados, los cuales son utilizados para gestionar el acceso y los permisos dentro de la aplicación. Esto incluye el acceso para el inicio de sesión, asegurando que solo los usuarios con el rol adecuado puedan acceder a ciertas funciones.

📅 Logros del Proyecto (Día 1)
Análisis de Requisitos: Se revisaron los requisitos funcionales y técnicos de la aplicación.
Configuración de la Base de Datos: Se implementaron las tablas necesarias en MySQL, incluyendo la gestión de roles.
Desarrollo de Funcionalidades CRUD: Se completó la funcionalidad de creación, lectura, actualización y eliminación de usuarios y blogs.
Integración Backend-Frontend: Se estableció la comunicación entre el servidor y la interfaz mediante APIs.
Asignación de Roles: Se logró asignar roles a los usuarios para la gestión de accesos y para el inicio de sesión.