import { SpeechRecognitionVoice } from './shared/providers/recognition-voice.service';
import { UserInterfaceService } from './shared/providers/user-interface.service';
import { Component, ViewChild, ElementRef, Renderer, OnInit, } from '@angular/core';
import {Router} from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    isVisibleMenu = false;
    @ViewChild('sidemenu') sideMenu: ElementRef;
    @ViewChild('content') content: ElementRef;
    menu = [];
    constructor(private render: Renderer,
                private ui: UserInterfaceService,
                private router: Router ) {
                }

ngOnInit() {
 this.ui.getAllMenu$().subscribe(menu => this.menu = menu);
}

selectMenu (idMenu) {
   this.router.navigate(['/task', idMenu]);
    this.toogleMenu ();
}


  /**
   * Método que muestra/oculta el menu lateral.
   */
  toogleMenu () {
  // clases del sideMenu para ocultar/mostrar menu
  const sideMenu = {
      class_menu_hidden: ['hidden-xs-down'],
      class_menu_visible: ['col-12', 'movimiento-menu']
      };
   // clases del content para ocultar/mostrar menu lateral
   const content = {
        class_menu_hidden: ['col-12'],
        class_menu_visible: ['hidden-xs-down']
      };

     if (!this.isVisibleMenu) {
       this.updateClassesUI(this.sideMenu, sideMenu.class_menu_visible, sideMenu.class_menu_hidden);
       this.updateClassesUI(this.content, content.class_menu_visible, content.class_menu_hidden);
     }else {
       this.updateClassesUI(this.sideMenu, sideMenu.class_menu_hidden, sideMenu.class_menu_visible);
       this.updateClassesUI(this.content, content.class_menu_hidden, content.class_menu_visible);
     }
     this.isVisibleMenu = !this.isVisibleMenu;
    }

    updateClassesUI (e: ElementRef, addClasses: Array<string>, deleteClasses: Array<string>){
      // se añaden las clases al elemento a través del Renderer (true, false para borrar)
      addClasses.map(className =>
         this.render.setElementClass(e.nativeElement, className, true)
      );
      deleteClasses.map(className =>
         this.render.setElementClass(e.nativeElement, className, false)
      );
    }

}
