import { SearchPipe } from './pipes/search.pipe';
import { TaskTabComponent } from './components/task-tab.component';
import { SharedModule } from './../shared/shared.module';
import { ToastyModule } from 'ng2-toasty';
import { FormsModule } from '@angular/forms';
import { TaskRouting } from './task-routing.module';
import { TaskComponent } from './task.component';
import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [TaskRouting, SharedModule], // enrutador
  declarations: [TaskComponent, TaskTabComponent, SearchPipe], // componentes
  providers: [],  // servicios
  exports: []
})

export class TaskModule {
}
