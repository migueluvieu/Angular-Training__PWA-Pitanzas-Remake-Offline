import {Injectable} from '@angular/core';
import {FirebaseListObservable, AngularFireDatabase, AngularFire  } from 'angularfire2';
import {AfoListObservable, AfoObjectObservable, AngularFireOffline } from 'angularfire2-offline';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
 export class UserInterfaceService {
    endPointMenu = 'user-interface/';
    constructor(public af: AngularFireOffline ) {}

    /**
     * Devuelve el menú ordenado por el campo orden de cada item
     * @returns {Observable<any>}
     *
     * @memberOf UserInterfaceService
     */
    getAllMenu$(): Observable<any> {
        return this.af.database.list(this.endPointMenu).map(this.sorted);
    }

    /**
     * Devuelve menú a partir del id seleccionado
     * @param {any} indexSelectedMenu
     * @returns
     *
     * @memberOf UserInterfaceService
     */
    selectMenu (indexSelectedMenu) {
       return this.getAllMenu$().map(menu => menu[indexSelectedMenu]);
   }

  /**
   * Devuelve las tabs correspondientes al menú seleccionado 
   *
   * @param {Object} menuSelected
   * @returns
   *
   * @memberOf UserInterfaceService
   */
    getTabs(menuSelected: Object) {
       // para obtener las tabs se selecciona el objeto tabs del menú seleccionado, que a su vez contiene objetos tab
       // (por ejemplo cenas:{..}, comidas:{..})...Mediante Object.keys se obtienen un listado de keys del objeto
       // tabs (comidas, cenas,...) y con un map convertimos todos los objetos en una lista la cual la ordenamos
       // -> Object.keys (https://msdn.microsoft.com/es-es/library/ff688127(v=vs.94).aspx)
                   const objTabs =  menuSelected['tabs'];
                   return this.sorted(Object.keys(objTabs).map(key => objTabs[key]));
    }

    // TODO meter en un utils
    public sorted(array) {
            return array.sort((n1, n2) => Number(n1.order) - Number(n2.order));
         }

 }
