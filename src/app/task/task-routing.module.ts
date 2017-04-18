import { TaskComponent } from './task.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule,  Routes} from '@angular/router';


const routes: Routes = [{
    path: 'task/:id',
    component: TaskComponent
  }
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)] , // configuración para un módulo hijo
    exports: [RouterModule]
})

export class TaskRouting {
}
