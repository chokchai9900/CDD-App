import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AfterRateModel, DataModel } from '../Models/RateDataModel';
import { RateDataService } from '../rate-data.service';
import { DBContextService } from '../services/dbcontext.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.page.html',
  styleUrls: ['./rate.page.scss'],
  providers: [RateDataService]
})
export class RatePage implements OnInit {

  private ChildId : string;
  private dataType : string;
  public yearage: number;
  public monthage: number;
  public fullmonth: number;
  public RateFullData: DataModel;
  public AfterRateData : AfterRateModel;

  constructor(private route: ActivatedRoute, private router: Router,private service: DBContextService,private getRateData :RateDataService) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.ChildId = this.router.getCurrentNavigation().extras.state.id;
        this.dataType = this.router.getCurrentNavigation().extras.state.typeRate;
        this.yearage = this.router.getCurrentNavigation().extras.state.yearage;
        this.monthage = this.router.getCurrentNavigation().extras.state.monthage;
        this.fullmonth = this.router.getCurrentNavigation().extras.state.fullmonth;
      }
    });
  }

  ngOnInit() {
    this.service.getRateDataByAgeValidate(String(this.fullmonth),this.dataType).then((it :DataModel ) =>{
      this.RateFullData = it;
    })
    
  }
  RateChild(isPass : boolean){
    var routing :string;
    console.log(isPass);
    this.service.RateChild(this.ChildId,String(this.fullmonth),this.dataType,isPass)
    let navigationExtras: NavigationExtras = {
      state: {
        childId: this.ChildId,
        fullmonth : this.fullmonth,
        dataType: this.dataType
      },
    };
    if (isPass) 
    {
      routing = 'pass'
    } 
    else 
    {
      routing = 'not-pass'
    }
    console.log(this.RateFullData.ResultAfterRate);
    
    this.router.navigate([routing], navigationExtras);
  }

}
