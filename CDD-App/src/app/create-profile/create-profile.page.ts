import { Component, OnInit } from '@angular/core';
import { ProfileModel } from '../Models/ProfileModel';
import { NavigationExtras, Router } from '@angular/router';
import { DBContextService } from '../services/dbcontext.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.page.html',
  styleUrls: ['./create-profile.page.scss'],
})
export class CreateProfilePage implements OnInit {

  private childName : string;
  private childBirthday : Date;
  private childGender : string;
  private childProfileImg : string;
  private childData : ProfileModel;

  constructor(private service: DBContextService,private router: Router) { 
    this.childData = new ProfileModel();
  }

  ngOnInit() {
  }

  createProfile(){
    this.childData.childName = this.childName;
    this.childData.childBirthday = this.childBirthday;
    this.childData.childGender = this.childGender;
    this.childData.childProfileImg = this.childProfileImg;
     console.log(this.childData);

     this.service.createProfileChild(this.childData).then((it : ProfileModel) =>{
      console.log(it);
     });
     
     
     
  }
  saveAndGoMenu(){
    this.createProfile();
    let navigationExtras: NavigationExtras  = {
      state:{
        data: this.childData
      }
    };
    this.router.navigate(['menu'],navigationExtras)
  }

}
