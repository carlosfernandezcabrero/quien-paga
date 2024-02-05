# QuienPaga

Aplicación para ver a quien le toca pagar la siguiente cuenta. Lo interesante es que esto lo decide de entre los integrantes del grupo que menos veces hayan pagado para que sea lo mas justo posible.

## Tecnologías utilizadas

- TailwindCss
- Nextjs
- Framer Motion
- Firebase
- Zod
- Zustand
- SweetAlert2
- Lucide Icons

## Desarrollo

- Crear un proyecto en Firebase.
- Crear una aplicación de tipo web dentro del proyecto. El nombre de la misma es indiferente.
- Crear el archivo `.env.development` en la raíz del proyecto.
- Rellenar las siguientes variables con la configuración de Firebase:

  ``` .env
  NEXT_PUBLIC_API_KEY=""
  NEXT_PUBLIC_AUTH_DOMAIN=""
  NEXT_PUBLIC_PROJECT_ID=""
  NEXT_PUBLIC_STORAGE_BUCKET=""
  NEXT_PUBLIC_MESSAGING_SENDER_ID=""
  NEXT_PUBLIC_APP_ID=""
  ```

- Activar el modulo de autenticación y activar el método de correo electrónico.
- Activar el modulo de Firestore.
- Desplegar las reglas de Firestore. Para ello deberemos añadir el proyecto que acabamos de crear con la utilidad firebase-tools. [Guía](https://firebase.google.com/docs/rules/manage-deploy?hl=es)
- Instalar las dependencias del proyecto

  ``` bash
  [npm|pnpm|bun] install
  ```

- Levantar el proyecto

  ``` bash
  [npm|pnpm|bun] run dev
  ```

## Pruebas

- Crear un proyecto en Firebase.
- Crear una aplicación de tipo web dentro del proyecto. El nombre de la misma es indiferente.
- Crear el archivo `.env.test` en la raíz del proyecto.
- Rellenar las siguientes variables con la configuración de Firebase:

  ``` .env
  NEXT_PUBLIC_API_KEY=""
  NEXT_PUBLIC_AUTH_DOMAIN=""
  NEXT_PUBLIC_PROJECT_ID=""
  NEXT_PUBLIC_STORAGE_BUCKET=""
  NEXT_PUBLIC_MESSAGING_SENDER_ID=""
  NEXT_PUBLIC_APP_ID=""
  ```

- Activar el modulo de autenticación y activar el método de correo electrónico.
- Activar el modulo de Firestore.
- Desplegar las reglas de Firestore. Para ello deberemos añadir el proyecto que acabamos de crear con la utilidad firebase-tools. [Guía](https://firebase.google.com/docs/rules/manage-deploy?hl=es)
- Instalar las dependencias del proyecto

  ``` bash
  [npm|pnpm|bun] install
  ```

- Levantar el proyecto

  ``` bash
  [npm|pnpm|bun] run dev:e2e
  ```

- Ejecutar las pruebas

  ``` bash
  npx playwright test [--ui]
  ```

## Contribuir

- Clonar el proyecto.
- Crear una rama con el prefijo `feature/` y un nombre que indique brevemente de que se trata.
- Realizar PR.