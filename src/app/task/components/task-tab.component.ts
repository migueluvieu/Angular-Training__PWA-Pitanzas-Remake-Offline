import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import {Component, Output, EventEmitter, Input, Renderer, ElementRef} from '@angular/core';


@Component({
    selector: 'app-task-tab',
    templateUrl: 'task-tab.component.html',
})

export class TaskTabComponent {

 // Se recibe tabs desde el componente task
   @Input() tabsFromParent: Array<any>;


   // output, para emitir evento al componente padre, en este caso
   // enviará la tab seleccionada->https://docs.ionic.io/api/client/eventemitter/
   @Output() selectTab: EventEmitter<string> = new EventEmitter<string>();
   private tabs ;
   private currentTab = 0;


   constructor( private elementRef: ElementRef,
               private renderer: Renderer) {}

 /**
  * Método emite al padre el tab seleccionado
  *
  * @param {any} indexTab
  *
  * @memberOf TaskComponent
  */
  getTaskList(indexTab) {
     this.activateTab(indexTab);
      this.selectTab.emit(indexTab);
  }

  /**
 * Función que añade la clase tabactive a la tab indicada y la elimina del resto.
 * @param {any} [id]
 * @memberOf TaskComponent
 */
   activateTab(id) {
      this.elementRef.nativeElement.querySelectorAll('a[id^="tab"]')
      .forEach(i => {
          (i.id !== 'tab-' + id) ?
           this.renderer.setElementClass(i, 'tabactive', false)
           : this.renderer.setElementClass(i, 'tabactive', true);
        });
  }
}
