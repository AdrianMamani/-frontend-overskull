# Overskull Project - Frontend

Frontend desarrollado con Vue 3 para la gestión de categorías y productos, conectado a una API REST desarrollada con Laravel.

El proyecto permite visualizar, crear, editar y eliminar categorías y productos desde un panel administrativo.

---

## Tecnologías utilizadas

- Vue 3
- Vite
- JavaScript
- Tailwind CSS
- Pinia
- Vue Router
- Axios
- Lucide Vue Next
- Laravel API
- MySQL

---

## Requisitos previos

Antes de ejecutar el proyecto es necesario tener instalado:

- Node.js 18 o superior
- npm
- Git
- Un navegador web moderno
- API Laravel funcionando

## Instalacion 
clonar el repositorio: 
git clone 

Ingresar al proyecto:
cd overskull-project

Instalar las dependencias: 
npm install

## Variables de entorno
Crear un archivo .env en la raiz del proyecto:
- VITE_API_BASE_URL=http://localhost:8000/api

La variable VITE_API_BASE_URL contiene la URL base de la API Laravel.

## Ejecucion:
Iniciar el servidor de desarrollo:
npm run dev

- El proyecto se ejecutrara normalmente en:
http://localhost:5173


# Gestión de categorías

La sección de categorías permite:

Listar categorías.
Crear categorías.
Editar categorías.
Eliminar categorías.
Confirmar antes de eliminar.
Mostrar estados de carga.
Mostrar errores de comunicación con la API.
Actualizar el listado después de las operaciones CRUD.

Se utiliza un modal para crear y editar categorías y un modal de confirmación antes de eliminar.

Gestión de productos

La sección de productos permite:

Listar productos.
Crear productos.
Editar productos.
Eliminar productos.
Seleccionar una categoría.
Validar los campos del formulario.
Mostrar precio.
Mostrar stock.
Confirmar la eliminación.
Actualizar el listado después de las operaciones CRUD.

El formulario contempla:

Categoría.
Nombre.
Descripción.
Precio.
Stock.