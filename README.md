# PWA Pitanzas Remake Offline
Aplicación PWA desarrollada sobre Angular 4.0.0 y bootstrap 4.0.0 alpha. BBDD RealTime Firebase3. Plugin angularfire2. AngularFire2 Offline.sw-precache-config.js para generación de service-worker y cacheo de recursos. Webkit speechRecognitios de chrome para la voz.
Se genera proyecto cordova para empaquetar la apk. 
Firebase como BaaS

## Demo

- [`Demo:`](https://pitanzas-public.firebaseapp.com/) [Read object]

## Install

```bash
npm install
```

## Deploy local (sin instalación de service worker)

```bash
ng serve --o
```
## Deploy local (con instalación de service worker)
Para instalación de service-worker en el browser local, ejecutar script 
```bash
npm run deploy-local
```
Ejecuta el build en entorno desarrollo, lanza el precaché y levanta un live-server con el dist/index.html

## Cordova
Se crea internamente proyecto cordova con el fin de generar apk.
```bash
cd cordova
cordova platform add android
npm run generate-apk
```

Ejecuta el build en entorno prod sobre la carpeta cordova/www seteando el base-href al index, lanza el precaché y empaqueta en cordova

## Deploy
Desplegada sobre firebase hosting 

## Pending
- AOT
- LazyLoading
- Icono WIFI
- I18N

## License

Licensed under the MIT Open Source license. For more information, see the [LICENSE](LICENSE) file in this repository.