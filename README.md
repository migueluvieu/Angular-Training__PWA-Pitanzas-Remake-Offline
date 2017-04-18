# PWA Pitanzas Remake Offline
Aplicación PWA desarrollada sobre Angular 4.0.0 y bootstrap 4.0.0 alpha. BBDD Firebase3 mediante plugin angularfire2. AngularFire2 Offline. Utilizado sw-precache-config.js para generación de service-worker y cacheo de recursos. 
También se genera proyecto cordova para empaquetar la apk 

## Demo

- [`Demo:`](https://pitanzas-public.firebaseapp.com/) [Read object]

## Install

```bash
npm install
```

## Build local

```bash
ng serve --o
```
## Build local (con service worker)
Para instalación de service-worker en el browser local, ejecutar script 
```bash
npm run deploy-local
```
script : 
"generate-apk" : "ng build && npm run precache && cd dist && live-server --port=4200 --host=localhost --entry-file=/index.html",
Ejecuta el build en entorno desarrollo, lanza el precaché y levanta un live-server con el dist/index.html

## Cordova
Se crea internamente proyecto cordova con el fin de generar apk.
```bash
cd cordova
cordova platform add android
npm run generate-apk
```


"generate-apk": "del cordova\\www\\ /F /Q && ng build --output-path cordova\\www\\ --base-href file:///android_asset/www/ &&  npm run precache && cd cordova && cordova run android"
Ejecuta el build en entorno prod sobre la carpeta cordova/www seteando el base-href al index, lanza el precaché y empaqueta en cordova

## Deploy
Desplegada sobre firebase hosting 

## Pending
- AOT
- LazyLoading
- Icono WIFI
- I18N


## License

angularfire2-offline is licensed under the MIT Open Source license. For more information, see the [LICENSE](LICENSE) file in this repository.