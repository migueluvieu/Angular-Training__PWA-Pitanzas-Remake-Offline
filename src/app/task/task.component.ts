import { by } from 'protractor';
import { SpeechRecognitionVoice } from './../shared/providers/recognition-voice.service';
import { Observable } from 'rxjs/Observable';
import { ISubscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/of';
import { UserToastService } from './../shared/providers/user-toast.service';
import {UserInterfaceService} from '../shared/providers/user-interface.service';
import { UserDataService } from './../shared/providers/user-data.service';
import {AfterContentInit, Renderer,   ElementRef,   Component,    OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

declare var window: any;

@Component({
    selector: 'app-task',
    templateUrl: 'task.component.html',
})

export class TaskComponent implements OnInit, AfterContentInit {
   private title;
   private tabs ;
   private taskList= [];
   // menú inicial
   private initialMenu= 0;
   private taskText;
   private isVisibleOptions = false;
   private currentIdInput;
   private grabando = false;
   constructor(private uiService: UserInterfaceService,
               private dataService: UserDataService,
               private toastService: UserToastService,
               private route: ActivatedRoute,
               private elementRef: ElementRef,
               private renderer: Renderer,
               private speech: SpeechRecognitionVoice
               ) {
                   
   }


 /**
  * se subscribe al ActivatedRoute, de tal forma que cuando se modifique la url
  * (con segmento /task, ya que es cuando entra en este componente .../task/) se obtiene id que será el
  * id de menú seleccionado (en realidad la posición, ya que se colocan en función del parámetro order de firebase) 
  * y se obtienen sus tabs y las tasks de la tab por defecto (0)
  * @memberOf TaskComponent
  */
   ngOnInit () {
     this.route.params
      .subscribe(params => {
        const _id = params['id'].toString(); // recepción del parámetro
            this.uiService.selectMenu(_id).subscribe(selectedMenu => {
                this.title = selectedMenu.title;
                // se obtiene las pestañas del menú
                this.tabs = this.uiService.getTabs(selectedMenu);
                // se obtiene lista de tareas a partir del uid de la pestaña
                this.dataService.getTaskList$(this.tabs[0]['list-uid']).subscribe(list => this.taskList = this.sortBy(list));
            });
      })
    ;
  }

/**
 * Se oculta micro en móvil de momento. Funciona en browser. En micro se puede utilizar el nativo como entrada
 */
ngAfterContentInit () {
    if (window.cordova) {
      this.removeMicro();
    }
}

 /**
  * Método que obtiene la lista de tareas de una tab concreta
  *
  * @param {any} indexTab
  *
  * @memberOf TaskComponent
  */
  getTaskList(indexTab) {
     this.dataService.getTaskList$(this.tabs[indexTab]['list-uid']).subscribe(list => this.taskList = this.sortBy(list));
  }

////////////////////////////////////////////////
/**
 * Inserta un task en firebase, comprobando primero si ya existe. Se informa mediante plugin toast
 * @param {any} text
 *
 * @memberOf TaskComponent
 */
  createTask (text) {
      // estas dos condiciones las añadimos antes porque en el offline no sale por el then
     this.taskText = '';
     this.toogleDisableCards(false);
      if (text) {
       this.dataService.insertTask(text.trim())
       .then(() => this.toastService.addToast(`Creado registro "${text}"`, this.toastService.type.SUCCESS))
      // .then(() => this.taskText = '')
      // .then(() => this.toogleDisableCards(false))
       .catch(err => this.toastService.addToast(`Ya existe registro "${text}"`, this.toastService.type.ERROR));
      }
  }
/**
 * Actualiza la tarea en BBDD
 * @param item
 */
  updateTask (item) {
      if (item.$key) {
        // estas dos condiciones las añadimos antes porque en el offline no sale por el then
        this.toogleOptionsCard(this.currentIdInput);
        this.toogleDisableCards(false);

          // si controles no visibles, implica que solo se va a modificar checked->
          // no se comprobará si la descripción existe
        this.dataService.updateTask(item, false)
        .then(() => this.toastService.addToast(`Actualizado registro`, this.toastService.type.SUCCESS))
        // .then(() => this.toogleOptionsCard(this.currentIdInput))
       // .then(() => this.toogleDisableCards(false))
        .catch(err => this.toastService.addToast(`Ya existe registro "${item.description}"`, this.toastService.type.ERROR));
      }
  }

 /**
  * Borra la tarea
  *
  * @param {any} item
  *
  * @memberOf TaskComponent
  */
  removeTask(item) {
      if (item.$key) {
        // estas dos condiciones las añadimos antes porque en el offline no sale por el then
        this.isVisibleOptions = false;
        this.toogleDisableCards(false);

        this.dataService.deleteTask(item.$key)
        .then(() => this.toastService.addToast(`Borrado registro "${item.description}"`, this.toastService.type.SUCCESS))
        // .then(() => this.isVisibleOptions = false)
        // .then(() => this.toogleDisableCards(false))
        .catch(err => this.toastService.addToast(`No se pudo borrar registro "${item.description}"`, this.toastService.type.ERROR));
      }
  }

 /**
  *
  * @param item hace un toogle de checked
  */
  toogleCheck(item) {
      // si no están visibles las opciones, hace el toogle
      if (!this.isVisibleOptions) {
        item.checked = !item.checked;
        // actualiza la tarea con el checked modificado
        if (item.$key) {
            this.dataService.updateTask(item, true)
            .catch(err => { console.log(err);
                 this.toastService.addToast(`No se pudo actualizar registro "${item.description}"`, this.toastService.type.ERROR);
        } );
        }
      }
     }

 /**
  * Hace un toogle del card de las opciones de cada task. Además pone el foco en el input si están visibles. Se accede por nativeElement
  *
  * @param {any} id
  *
  * @memberOf TaskComponent
  */
  toogleOptionsCard (id) {
      this.currentIdInput = id;
      const element = this.elementRef.nativeElement.querySelector('#input-'.concat(id));
      this.isVisibleOptions = !this.isVisibleOptions;
      if (this.isVisibleOptions) {
          // deshabilitamos en resto de cards menos el actual, le ponemos el foco y
          // toogle del readonly del input, para habilitarlo a escritura
          element.readOnly = !element.readOnly;
          element.focus();
          this.toogleDisableCards(true, id);
       }else {
           // se estará cerrando el options, por ello se vuelve a habilitar todos los cards
          this.toogleDisableCards(false);
       }
  }


/**
 * Función que habilita o deshabilita todos los cards. Si se le pasa un id, implica que habilitará/deshabilitará 
 * todos los cards menos ese.
 * @param {any} disabled  disabled = true se deshabilitan toso, se habilitan si no
 * @param {any} [id]
 * 
 * @memberOf TaskComponent
 */
   toogleDisableCards(disabled, id?) {
      const elements = this.elementRef.nativeElement.querySelectorAll('div[id^="card"]');
      elements.forEach(i => {
          if (id === null || i.id !== 'card-' + id) {
            this.renderer.setElementClass(i, 'disabled-element', disabled);
          }
        });
  }

 /**
  * Función que ordena por checked y por descripción
  *
  * @param {any} list
  * @returns
  *
  * @memberOf TaskComponent
  */

sortBy(list) {
   return this.orderBy(list.filter(a => !a.checked), 'description')
    .concat(this.orderBy(list.filter(a => a.checked), 'description'));
}

/**
 * 
 * @param arr Función privada que ordena por campo indicado
 * @param parameter
 */
private orderBy (arr: Array<any>, parameter) {
  // TODO meter en un utils
  return arr.sort((a, b) => a[parameter].localeCompare(b[parameter]));
}

/**
 * Función que graba voz a través del webkit del navegador
 */
record() {
    let  subscription: ISubscription;
    this.taskText = '';
    this.toastService.addToast(`Grabando audio....`, this.toastService.type.INFO);
    this.activaMicro(true);
    subscription = this.speech.record('es_ES').subscribe(i => {this.taskText = i.trim(); } );
    this.speech.record('es_ES').subscribe(i => {this.taskText = i.trim(); } );
    setTimeout(() => {subscription.unsubscribe(); this.speech.stop(); this.activaMicro(false); }, 3000);
}

/**
 * Oculta el micro en app
 * @memberOf TaskComponent
 */
removeMicro() {
     const element = this.elementRef.nativeElement.querySelector('#micro');
     this.renderer.setElementStyle(element, 'display', 'none');
}

/**
 * Oculta el micro en app
 * @memberOf TaskComponent
 */
activaMicro(flag) {
     const element = this.elementRef.nativeElement.querySelector('#micro');
     this.renderer.setElementClass(element, 'crece', flag);
}

 

}
