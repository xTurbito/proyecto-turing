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
1. Análisis de Requisitos
Se llevaron a cabo reuniones para revisar y definir los requisitos funcionales y técnicos de la aplicación, identificando las principales necesidades del sistema y los flujos de usuario.

2. Configuración de la Base de Datos
Se diseñaron e implementaron las tablas necesarias en MySQL, asegurando la correcta estructura de la base de datos para soportar las funcionalidades del proyecto. Esto incluyó la creación de relaciones entre las tablas y la gestión de roles para control de acceso.

3. Desarrollo de Funcionalidades CRUD
Se desarrollaron las funcionalidades CRUD (Crear, Leer, Actualizar, Eliminar) para los módulos de usuarios y blogs. Estas funcionalidades permiten gestionar de manera eficiente los datos de los usuarios y los blogs dentro de la aplicación.

4. Integración Backend-Frontend
Se estableció la comunicación entre el servidor y la interfaz de usuario mediante APIs RESTful. Esto permitió que el frontend pudiera interactuar de manera fluida con el backend para obtener, enviar y actualizar datos en tiempo real.

5. Asignación de Roles
Se implementó un sistema de asignación de roles para los usuarios, lo que facilita la gestión de accesos y permisos dentro de la aplicación. Esto es esencial para garantizar que solo los usuarios autorizados puedan acceder a funciones o áreas específicas del sistema, como el inicio de sesión y la administración.


📅 Logros del Proyecto (Día 2)
1. Implementación de Validación con JWT
Se incorporó un sistema de autenticación mediante JSON Web Tokens (JWT) para asegurar la validez de las solicitudes. Esto asegura que solo los usuarios autenticados puedan acceder a las rutas protegidas de la aplicación.

2. Uso de Middlewares para Protección de Rutas
Se implementaron middlewares para proteger las rutas críticas de la aplicación, asegurando que solo los usuarios con roles adecuados puedan acceder a recursos específicos. Esto mejora la seguridad del proyecto y permite un control más granular sobre el acceso.

3. Gestión de Imágenes
Se trabajó en la carga y manejo de imágenes dentro del proyecto. Se ajustaron las rutas y configuraciones para asegurar que las imágenes puedan ser subidas y gestionadas de manera efectiva. Esto incluye la validación de los formatos y tamaños de archivo antes de la carga.

📅 Logros del Proyecto (Día 3)

1. Trabajo en el Front-End: Carga de Imágenes y Datos del Backend
Se integró la funcionalidad para cargar imágenes y mostrar datos desde el backend al front-end. Esto incluyó la implementación de formularios para permitir la carga de imágenes y la actualización de datos de manera dinámica. Se aseguraron de que los datos del servidor se obtuvieran correctamente y se presentaran en la interfaz de usuario.

2. Mejora en la Responsividad de la Aplicación
Se trabajó en hacer que la aplicación sea completamente responsiva, adaptándose a diferentes tamaños de pantalla. Esto incluyó ajustes en los estilos CSS y el uso de frameworks como Bootstrap para garantizar que la interfaz de usuario fuera fluida y se viera bien tanto en dispositivos móviles como en escritorio.

3. Optimización de la Experiencia de Usuario
Se implementaron mejoras para hacer la experiencia de usuario más amigable. Esto incluye la validación de la carga de imágenes en tiempo real, la actualización de datos de manera eficiente sin recargar la página, y la mejora de la presentación de los datos cargados, asegurando una experiencia fluida y sin interrupciones.


4. INSTALAR NODE JS
https://nodejs.org/en/

5. LEVANTAR PROYECTO
1.- Clonar el repositorio
2.- Importar la bd en mysql
3.- Entrar a la carpeta back con "cd back" e instalar las dependencias "npm install"
4.- Levantar el back con "nodemon app"
5.- Entrar a la carpeta front con "cd front" e instalar las dependcias "npm install"
6.- Levantr el front "npm run dev"

6. CREDENCIAL DE INICIO DE SESIÓN
Usuario: walther@gmail.com  
Pass: 12345678
