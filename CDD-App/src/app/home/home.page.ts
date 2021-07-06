import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DBContextService } from "../services/dbcontext.service";
import { IonLoaderService } from '../ion-loader.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public ProfileData$ = Promise.resolve<any>([]);
  constructor(private service: DBContextService,private router: Router,private ionLoaderService: IonLoaderService) {}

  ngOnInit(){
    this.displayAutoLoader();
    this.hideLoader();
  }

  displayAutoLoader() {
    this.ionLoaderService.autoLoader();
  }

  hideLoader() {
    this.ionLoaderService.dismissLoader();
  }

  rountNextpage(){
    this.ProfileData$ = this.service.getProfileChild();
    this.ProfileData$.then((it :any) =>{
      let count = it.length;
      if (count == 0) {
        this.router.navigateByUrl('/create-profile');
      }
      else{
        this.router.navigateByUrl('/child-list');
      }
      console.log(count);
    });
  }

}
