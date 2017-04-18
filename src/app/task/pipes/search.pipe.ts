import {Pipe, PipeTransform} from '@angular/core' ;

 @Pipe({
     name: 'search'
 })

 export class SearchPipe implements PipeTransform {

  transform  (arr: Array<any>,  field: string, search: string) {
     if (typeof search === 'undefined') {
         return arr;
     }
      // En este caso filter lo que hace es seleccionar del array los que cumplan
      // la condición (mirar pruebaSumaValores)
      
     return arr.filter((res) => {
          // mirar doc para include de un array , es como un like. Se puede aplicar
          // a un array de items como el del doc o bien a un solo valor como en nuestro caso
          // https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/includes
         return res[field].toUpperCase().includes(search.toUpperCase());
     });
    }
}
