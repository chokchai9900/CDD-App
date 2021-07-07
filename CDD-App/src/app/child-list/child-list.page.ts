import { Component, OnInit, Type } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DBContextService } from '../services/dbcontext.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.page.html',
  styleUrls: ['./child-list.page.scss'],
})
export class ChildListPage implements OnInit {
  public ProfileData$ = Promise.resolve<any>([]);
  constructor(
    private service: DBContextService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.ProfileData$ = this.service.getProfileChild();
    this.ProfileData$.then((it: any) => {
      console.log(this.ProfileData$);
    });
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
    window.location.reload();
  }


  async deleteProfile(id: string) {
    let alert = this.alertCtrl.create({
      message: 'ต้องการลบข้อมูลเด็กหรือไม่',
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'ตกลง',
          handler: () => {
            console.log('Deleted');
            this.service.deleteProfileChild(id); //del rowfrom DB
            // this.refresh();
          },
        },
      ],
    });
    (await alert).present();
  }

  refresh(): void {
    window.location.reload();
  }

  getDetail(data: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        data: data,
      },
    };
    this.router.navigate(['profile'], navigationExtras);
  }

  editPrifile(data: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        data: data,
      },
    };
    this.router.navigate(['edit-profile'], navigationExtras);
  }
}
