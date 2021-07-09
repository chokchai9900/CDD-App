import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AfterRateModel, DataModel } from '../Models/RateDataModel';
import { RateDataService } from '../rate-data.service';
import { DBContextService } from '../services/dbcontext.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.page.html',
  styleUrls: ['./rate.page.scss'],
  providers: [RateDataService]
})
export class RatePage implements OnInit {

  public yearage: number;
  public monthage: number;
  private ChildId : string;
  private dataType : string;
  public fullmonth: number;
  public AfterRateData : AfterRateModel;

  public RateFullData: any;

  constructor(private route: ActivatedRoute, private router: Router,private service: DBContextService,private getRateData :RateDataService,private navCtrl: NavController) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.RateFullData = this.router.getCurrentNavigation().extras.state.data;
        this.yearage = this.router.getCurrentNavigation().extras.state.yearage;
        this.monthage = this.router.getCurrentNavigation().extras.state.monthage;
        this.ChildId = this.router.getCurrentNavigation().extras.state.ChildId;
        this.fullmonth = this.router.getCurrentNavigation().extras.state.fullmonth;
        this.dataType = this.router.getCurrentNavigation().extras.state.dataType;
      }
    });
  }

  ngOnInit() {
    console.log(this.RateFullData);
    console.log(this.RateFullData.rateID);
    console.log(this.ChildId);
  }

  RateChild(isPass : boolean){
    var routing :string;
    console.log(isPass);
    this.service.RateChild(this.ChildId,this.RateFullData.rateID,String(this.fullmonth),this.dataType,isPass)
    let navigationExtras: NavigationExtras = {
      state: {
        childId: this.ChildId,
        dataType: this.dataType,
        fullmonth : this.fullmonth,
      },
    };
    // if (isPass) 
    // {
    //   routing = 'pass'
    // } 
    // else 
    // {
    //   routing = 'not-pass'
    // }
    // console.log(this.RateFullData.ResultAfterRate);
    
    this.navCtrl.back();
  }

}
