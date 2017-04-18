import { SharedModule } from './shared/shared.module';
import { UserToastService } from './shared/providers/user-toast.service';
import { UserDataService } from './shared/providers/user-data.service';
import { UserInterfaceService } from './shared/providers/user-interface.service';
import { AppRoutingModule } from './app-routing.module';
import { TaskModule } from './task/task.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AngularFireModule } from 'angularfire2';

import { AngularFireOfflineModule } from 'angularfire2-offline';
import {ToastyModule} from 'ng2-toasty';

import {firebaseConfig} from './shared/config'


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireOfflineModule,
    TaskModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
