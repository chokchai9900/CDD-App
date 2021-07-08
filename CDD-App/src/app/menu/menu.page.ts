import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProfileModel } from '../Models/ProfileModel';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  private childProfiledata:ProfileModel;
  public birthdate: any;
  public monthage: number;
  public yearage: number;
  public fullmonth: number

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.childProfiledata = this.router.getCurrentNavigation().extras.state.data;
      }
    });
  }

  ngOnInit() {
    console.log("menu page");
    this.dateCal();
    
    console.log(this.fullmonth);
    console.log(this.childProfiledata);
  }
  NavigateRate(type :string){
    let navigationExtras: NavigationExtras  = {
      state:{
        id: this.childProfiledata._id,
        typeRate: type,
        yearage : this.yearage,
        monthage: this.monthage,
        fullmonth: this.fullmonth
      }
    };
    this.router.navigate(['rate-menu'],navigationExtras)
  }

  dateCal(){
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

}
