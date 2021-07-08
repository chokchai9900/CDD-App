import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AfterRateModel, DataModel } from '../Models/RateDataModel';
import { DBContextService } from '../services/dbcontext.service';

@Component({
  selector: 'app-rate-menu',
  templateUrl: './rate-menu.page.html',
  styleUrls: ['./rate-menu.page.scss'],
})
export class RateMenuPage implements OnInit {

  private ChildId : string;
  private dataType : string;
  public yearage: number; //
  public monthage: number;
  public fullmonth: number; //
  private dataTypeDiscription : string;

  public currenctData$ = new Array<DataModel>();

  constructor(private route: ActivatedRoute,private router: Router,private service: DBContextService) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.ChildId = this.router.getCurrentNavigation().extras.state.id;
        this.dataType = this.router.getCurrentNavigation().extras.state.typeRate;
        this.yearage = this.router.getCurrentNavigation().extras.state.yearage;
        this.monthage = this.router.getCurrentNavigation().extras.state.monthage;
        this.fullmonth = this.router.getCurrentNavigation().extras.state.fullmonth;
        this.dataTypeDiscription = this.router.getCurrentNavigation().extras.state.dataTypeDiscription;
      }
    });
  }

  ngOnInit() {
    this.service.getRateDataByAgeValidate(String(this.fullmonth),this.dataType).then((it :DataModel[] ) =>{
      this.currenctData$ = it;
      console.log(this.currenctData$);
      console.log(this.dataTypeDiscription);
    })
    console.log(this.ChildId);
    
  }

  onClick(RateData : DataModel){
    let navigationExtras: NavigationExtras  = {
      state:{
        data: RateData,
        yearage: this.yearage,
        monthage: this.monthage,
        ChildId: this.ChildId,
        fullmonth: this.fullmonth,
        dataType: this.dataType
      }
    };
    this.router.navigate(['rate'],navigationExtras)
  }
}
