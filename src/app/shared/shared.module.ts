import { SpeechRecognitionVoice } from './providers/recognition-voice.service';
import { UserToastService } from './providers/user-toast.service';
import { UserInterfaceService } from './providers/user-interface.service';
import { UserDataService } from './providers/user-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import {ToastyModule} from 'ng2-toasty';

/**
 * El módulo compartido se importa en todos los demás módulos
 * Con dos propósitos:
 *  - unificar las dependencias externas comunes
 *  - definir componentes y servicios reutilizables por la aplicación
 */
@NgModule({
  imports: [// Módulos necesarios
    CommonModule,
    FormsModule,
    HttpModule,
    ToastyModule.forRoot()
  ],
  providers: [
    UserDataService, // Servicio para interactuar con el modelo
    UserInterfaceService, // Servicio para datos de interface
    UserToastService, // servicio que implementa los mensajes toast
    SpeechRecognitionVoice // Servicio para el reconocimiento de voz
  ],
  exports: [// Lo que aquí se exporte se importará en los módulos funcionales
    CommonModule,
    FormsModule,
    HttpModule,
    ToastyModule
  ]
})
export class SharedModule { }
