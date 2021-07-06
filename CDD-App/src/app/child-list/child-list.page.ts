import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DBContextService } from '../services/dbcontext.service';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.page.html',
  styleUrls: ['./child-list.page.scss'],
})
export class ChildListPage implements OnInit {
  public ProfileData$ = Promise.resolve<any>([]);
  constructor(private service: DBContextService, private router: Router) {}

  ngOnInit() {
    this.ProfileData$ = this.service.getProfileChild();
    this.ProfileData$.then((it: any) => {
      console.log(this.ProfileData$);
    });
  }

  ionViewWillEnter() {
    
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
