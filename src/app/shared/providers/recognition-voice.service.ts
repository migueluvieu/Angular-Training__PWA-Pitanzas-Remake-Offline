import {NgZone, Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

declare var window: any;
declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Injectable()
 export class SpeechRecognitionVoice {
 private recognition: any;

constructor(private zone: NgZone) {}

record (language: string): Observable <string> {
   return Observable.create (observer => {
       if (window.cordova) {
        this.recognition = new SpeechRecognition();
       } else if (!('webkitSpeechRecognition' in window)) {return;
              } else {
              this.recognition = new webkitSpeechRecognition();
              }
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        // con el zone.run lo hacemos correr en la zona angular para poder renderizarlo en la vista
        this.recognition.onresult = e => this.zone.run (() =>
          observer.next(e.results[0][0].transcript) );
        this.recognition.onerror = error => observer.error(error);
        this.recognition.onend = () => observer.complete();
        this.recognition.lang = language;
        this.recognition.start();
  });
 }

   stop() {
     this.recognition.stop();
   };
 }
