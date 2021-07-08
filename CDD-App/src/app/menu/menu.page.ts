import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProfileModel } from '../Models/ProfileModel';
import { DBContextService } from '../services/dbcontext.service';

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

  private dataTypeDiscription : string;

  constructor(private route: ActivatedRoute, private router: Router,private service: DBContextService) { 
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

    if (type == "GM") {
      this.dataTypeDiscription = "พัฒนาการด้านการเคลื่อนไหว (GM)";
    }
    if (type == "FM") {
      this.dataTypeDiscription = "พัฒนาการด้านกล้ามเนื้อมัดเล็กและสติปัญญา (FM)";
    }
    if (type == "RL") {
      this.dataTypeDiscription = "พัฒนาการด้านการเข้าใจภาษา (RL)";
    }
    if (type == "EL") {
      this.dataTypeDiscription = "พัฒนาการด้านการใช้ภาษา (EL)";
    }
    if (type == "PS") {
      this.dataTypeDiscription = "พัฒนาการด้านการช่วยเหลือตนเองและสังคม (PS)";
    }
    console.log(this.dataTypeDiscription);
    console.log(type);
    
    
    let navigationExtras: NavigationExtras  = {
      state:{
        id: this.childProfiledata._id,
        typeRate: type,
        yearage : this.yearage,
        monthage: this.monthage,
        fullmonth: this.fullmonth,
        dataTypeDiscription: this.dataTypeDiscription
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
