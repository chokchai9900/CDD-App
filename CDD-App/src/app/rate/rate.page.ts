import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataModel } from '../Models/RateDataModel';
import { DBContextService } from '../services/dbcontext.service';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.page.html',
  styleUrls: ['./rate.page.scss'],
})
export class RatePage implements OnInit {

  private ChildId : string;
  private dataType : string;
  public yearage: number;
  public monthage: number;
  public fullmonth: number;
  public RateData: DataModel;

  constructor(private route: ActivatedRoute, private router: Router,private service: DBContextService) { 
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
      this.RateData = it;
    })
  }
  RateChild(isPass : boolean){
    console.log(isPass);

  }

}
