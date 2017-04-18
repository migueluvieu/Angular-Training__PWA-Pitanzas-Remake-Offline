import {Injectable} from '@angular/core';
import { FirebaseListObservable, AngularFireDatabase, AngularFire, FirebaseObjectObservable  } from 'angularfire2';
import {AfoListObservable, AfoObjectObservable, AngularFireOffline } from 'angularfire2-offline';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
 export class UserDataService {
     endPointData = 'user-data/';
     currentTaskList= [];
     currentTaskList$: AfoListObservable<any[]> ;
     currentUid= '';
    constructor(public af: AngularFireOffline ) {}

    /**
     * Recupera lista observale de tareas a partir del uid
     * @param uid
     */
 getTaskList$(uid) {
    this.currentUid = uid;
    this.currentTaskList$ = this.af.database.list(this.endPointData.concat(uid), {
      query: {orderByChild: 'description'},
    });
    // mantenemos en memoria una lista NO observable con las tareas
   this.currentTaskList$.subscribe(lista => {this.currentTaskList = lista; } );
    return this.currentTaskList$;
  }

    /**
     * Recupera una tarea de la lista NO Observable a partir de la descripción
     * @param description
     */
  getTask (description) {
        return this.currentTaskList.filter(i => i.description === description);
    }

  /**
   * Promise que inserta una tarea en repositorio comprobando previamente que no existe
   * @param text
   */
    insertTask(text): Promise<any> {
        return new Promise ( (resolve, reject) => {
            // si no existe tarea, la inserta
            this.getTask(text).length === 0
            ? resolve(this.currentTaskList$.push({'description': text, 'checked': false, 'detail': ''}))
            : reject('err');
    });
  }

    /**
     * Borra una tarea a partir del id
     * @param id
     */
     deleteTask(uid) {
        return this.currentTaskList$.remove(uid);
      }

  /**
   * Promise que actualiza una tarea en repositorio comprobando previamente que no existe
   * Se obtiene referencia a la tarea en firebase y se actualiza con nuevo valor
   * Se recibe parámetro onlyChecked, ya que si solo se modifica el checked no se comprobará
   * que la descripción exista. Con esto aprovechamos mismo método
   * @param text
   */
    updateTask2(task, onlyChecked): Promise<any> {
      const description = task.description;
      const checked = task.checked;
        return new Promise ( (resolve, reject) => {
            // si no existe tarea, la inserta
            console.log('tara encontrada', this.getTask(task.description));
            if (this.getTask(task.description).length === 0 || onlyChecked) {
              // ojo this.currentTaskList$.update(task.$key,task) no funciona!!!!
              // con el angularfire-offline no se pueden actualizar el objeto completo task (no hay problema con el angularfire2),
              // hay que meter las propiedades de negocio solamente para evitar que vayan las bindings de firebase ($key, $exist,...)
              resolve(this.currentTaskList$.update(task.$key, {'description': task.description, 'checked': task.checked, 'detail': ''}));
              }else {
                reject('err');
              };
    });
  }
 
 /**
  * Actualiza una tarea en BBDD.
  * @param task
  */
   updateTask(task, onlyChecked) {
      // ojo this.currentTaskList$.update(task.$key,task) no funciona!!!!
      // con el angularfire-offline no se pueden actualizar el objeto completo task (no hay problema con el angularfire2),
      // hay que meter las propiedades de negocio solamente para evitar que vayan las bindings de firebase ($key, $exist,...)
      return  this.currentTaskList$.update(task.$key, {'description': task.description, 'checked': task.checked, 'detail': ''});
   }

 }
