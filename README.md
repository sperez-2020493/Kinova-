# Laboratorio #3: Sistema de Gestión de Opiniones

## Descripción del Proyecto

Este proyecto tiene como objetivo la creación de un sistema de gestión de opiniones similar a las publicaciones de **Facebook**, enfocado en la interacción y expresión de opiniones por parte de los usuarios. Se ha desarrollado un Backend utilizando **Node.js**, **Express** y **MongoDB**, con la implementación de sistemas de seguridad y autenticación.

# Instrucciones de Instalación

Siga los siguientes pasos para clonar el repositorio y comenzar a trabajar con el proyecto:

1. Abra la terminal o CMD en una carpeta.
2. Clone el repositorio usando el siguiente comando:
   
   ```bash
   git clone <URL_REPOSITORIO>

3. luego instala las dependencias.

   ```bash
   npm i 

4. Luego ya podras inciar el programa con este comando.

   ```bash
   npm start dev

Nota: Recuerda que debes instalar NodeJS y MongoDB.


## Funcionalidades Implementadas

### 1. **Inicio de sesión y Perfil de usuario**

- Los usuarios pueden crear cuentas y acceder al sistema mediante un proceso de inicio de sesión seguro. El login es posible usando **correo electrónico** o **nombre de usuario** y **contraseña**.
- Los usuarios tienen la opción de editar su perfil, incluyendo su nombre de usuario y contraseña. Para cambiar la contraseña, deben ingresar la contraseña anterior como medida de seguridad.
- **No se permite la eliminación de perfiles**, lo cual garantiza la integridad de las opiniones y comentarios de los usuarios.

### 2. **Gestión de publicaciones**

- Los usuarios pueden crear publicaciones para expresar sus opiniones. Cada publicación contiene:
  - **Título**
  - **Categoría**
  - **Texto principal**
- Se permite la **edición** de publicaciones existentes para corregir errores o actualizar la información.
- Los usuarios pueden **eliminar** sus propias publicaciones, pero **no pueden eliminar las publicaciones de otros usuarios**.

### 3. **Comentarios**

- Otros usuarios pueden comentar en las publicaciones para expresar sus opiniones o agregar información adicional.
- Los comentarios pueden ser **editados** para corregir errores, pero solo el autor del comentario puede modificar su propio comentario.
- Los usuarios pueden **eliminar** sus propios comentarios, pero **no tienen permisos para eliminar los comentarios de otros**.

### 4. **Gestión de categorías**

- El sistema tiene un conjunto de **categorías predefinidas**, que son gestionadas exclusivamente por un **único administrador**.
- El administrador tiene la capacidad de:
  - Crear nuevas categorías.
  - Editar categorías existentes.
  - Eliminar categorías, lo que afecta a las publicaciones asociadas a ellas.
- **Una categoría por defecto** se genera al iniciar el proyecto.
- Los usuarios no pueden agregar ni modificar categorías.


## Tecnologías Utilizadas

- **Node.js**: Para la creación del servidor y el manejo de rutas.
- **Express**: Para la gestión de peticiones HTTP y middleware.
- **MongoDB**: Para la base de datos y la gestión de datos relacionados con usuarios, publicaciones, comentarios y categorías.
- **JWT**: Para la autenticación de usuarios y la gestión de sesiones.
- **Argon2**: Para el cifrado de contraseñas de usuarios.

## Desarroladores

- Samuel Alexander Perez Cap

---

Este sistema de gestión de opiniones permite una experiencia dinámica y controlada para que los usuarios puedan interactuar de manera segura y estructurada. A través de la implementación de sistemas de seguridad, autenticación y control de acceso, garantizamos la protección de la integridad de los datos y la experiencia del usuario.

Gracias por su atención. ¡Espero que encuentren útil este sistema!
