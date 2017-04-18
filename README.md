# PWA Pitanzas Remake Offline
- Aplicación PWA. 
- Desarrollada sobre Angular 4.0.0 y bootstrap 4.0.0 alpha, responsive design. 
- Persistencia Firebase3, tanto para los datos de negocio como para el menú de la aplicación.
- Angularfire2 y AngularFire2Offline para gestión offline de la aplicación. 
- sw-precache para generación de service-worker y cacheo de recursos. 
- Webkit speechRecognition de chrome para la voz.
- Desplegada en Firebase Hosting
- Adicionalmente se puede empaquetar a través de cordova, el proyecto contiene carpeta ./cordova y script customizado para ello.  
- Firebase como PaaS.

## Demo
- [`Demo de la aplicación:`](https://pitanzas-public.firebaseapp.com/)

## Install

```bash
npm install
```

## Deploy local (sin instalación de service worker)

```bash
ng serve --o
```
## Deploy local (con instalación de service worker)
Para instalación de service-worker en el browser local, ejecutar script deploy-local, definido en el package.json 
```bash
npm run deploy-local
```
Ejecuta el build en entorno desarrollo, lanza el precaché y levanta un live-server con el dist/index.html

## Cordova
Contiene internamente proyecto cordova. Para generar empaquetado cordova ejecutar script generate-apk, definido en el package.json
```bash
cd cordova
cordova platform add android
npm run generate-apk
```

Ejecuta el build en entorno prod sobre la carpeta cordova/www seteando el base-href de android al index, lanza el precaché y empaqueta en cordova

## Deploy
Desplegada sobre firebase hosting, [`aquí`](https://pitanzas-public.firebaseapp.com/)

## Pending
- AOT
- LazyLoading
- ElectronJS
- Icono WIFI
- I18N

## License
Licensed under the MIT Open Source license.
