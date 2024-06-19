# Calidad del Aire
Interfaz para consultar el clima actual y los datos principales de calidad del aire para Colombia, desarrollada con React. Los datos se obtienen desde la [AirVisual API](https://www.iqair.com/).

## Para iniciar el proyecto
Primero, agregar en la raíz del proyecto el archivo `.env` con las variables de entorno necesarias.

Luego, ejecutar los comandos:
```
npm install
npm run dev
```

La aplicación se ejecuta en http://localhost:5173/

## Características
Para cambiar el país para el cual se desean consultar los datos de calidad del aire, verificar que el país esté disponible en la API y cambiar el valor de la variable de entorno `VITE_COUNTRY` por el nombre.