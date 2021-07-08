import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , NavigationExtras, Router } from '@angular/router';
import { DBContextService } from '../services/dbcontext.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  childProfiledata: any;
  public birthdate: number;
  public monthage: number;
  public yearage: number;
  public fullmonth: number
  public exportData$ = Promise.resolve<any>([]) ; 
  public 

  constructor(private route: ActivatedRoute, private router: Router,private service: DBContextService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.childProfiledata = this.router.getCurrentNavigation().extras.state.data;
      }
    });
  }

  ngOnInit() {
    this.birthdate = this.childProfiledata.childBirthday;
    let Birthday = new Date(this.childProfiledata.childBirthday);
    let now  = new Date(Date.now());
    let months = (now.getFullYear() - Birthday.getFullYear()) * 12;
    months -= Birthday.getMonth();
    months += now.getMonth();
    this.fullmonth = months;
    if (months >= 12) {
      this.yearage = Math.floor(months / 12);
    }
    else
    {
      this.yearage = 0;
    }
    this.monthage = months % 12;
  }
  onClickNavigate(){
    let navigationExtras: NavigationExtras  = {
      state:{
        data: this.childProfiledata
      }
    };
    this.router.navigate(['menu'],navigationExtras)
  }
  /////////////////////////////////////////////
  onClickNavigateResult(){
    this.service.getResultChildByID(this.childProfiledata._id).then((it : any) => {
      let navigationExtras: NavigationExtras  = {
        state:{
          data: it,
        }
      };
      this.router.navigate(['results'],navigationExtras)
    });
    
  }


}
