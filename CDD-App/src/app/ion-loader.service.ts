import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class IonLoaderService {

  constructor(public loadingController: LoadingController) { }

  // Dismiss loader
  dismissLoader() {
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
  }

  // Auto hide show loader
  autoLoader() {
    this.loadingController.create({
      message: 'กรุณารอสักครู่นะคะ',
      duration: 7000
    }).then((response) => {
      response.present();
      response.onDidDismiss().then((response) => {
        console.log('Loader dismissed', response);
      });
    });
  }      

}