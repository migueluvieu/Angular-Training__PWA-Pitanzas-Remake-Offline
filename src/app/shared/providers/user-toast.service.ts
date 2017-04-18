import {Injectable} from '@angular/core';
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

@Injectable()
 export class UserToastService {

  public type = {
    DEFAULT: 'default',
    INFO: 'info',
    SUCCESS: 'success',
    WAIT: 'wait',
    ERROR: 'error',
    WARNING: 'warning'
  };

  private config = {
      TIMEOUT: 3000,
      THEME: 'material'
  };

 constructor(private toastyService: ToastyService ) {}

 addToast(message, type) {
        const toastOptions: ToastOptions = {
            title: '',
            showClose: true,
            timeout: this.config.TIMEOUT,
            theme: this.config.THEME,
        };
        toastOptions.msg = message;

        switch (type) {
            case this.type.DEFAULT: this.toastyService.default(toastOptions); break;
            case this.type.INFO: this.toastyService.info(toastOptions); break;
            case this.type.SUCCESS: this.toastyService.success(toastOptions); break;
            case this.type.WAIT: this.toastyService.wait(toastOptions); break;
            case this.type.ERROR: this.toastyService.error(toastOptions); break;
            case this.type.WARNING: this.toastyService.warning(toastOptions); break;
        }
    }
 }
