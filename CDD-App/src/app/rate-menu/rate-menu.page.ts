import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProfileModel } from '../Models/ProfileModel';
import { AfterRateModel, DataModel } from '../Models/RateDataModel';
import { RateDataService } from '../rate-data.service';
import { DBContextService } from '../services/dbcontext.service';

@Component({
  selector: 'app-rate-menu',
  templateUrl: './rate-menu.page.html',
  styleUrls: ['./rate-menu.page.scss'],
})
export class RateMenuPage implements OnInit {
  private ChildId: string;
  private dataType: string;
  public yearage: number;
  public monthage: number;
  public fullmonth: number;
  public RateFullData: DataModel;
  public AfterRateData: AfterRateModel;
  private childProfiledata: ProfileModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: DBContextService,
    private getRateData: RateDataService
    
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.ChildId = this.router.getCurrentNavigation().extras.state.id;
        this.dataType =
          this.router.getCurrentNavigation().extras.state.typeRate;
        this.yearage = this.router.getCurrentNavigation().extras.state.yearage;
        this.monthage =
          this.router.getCurrentNavigation().extras.state.monthage;
        this.fullmonth =
          this.router.getCurrentNavigation().extras.state.fullmonth;
      }
    });
  }

  ngOnInit() {
    this.service
      .getRateDataByAgeValidate(String(this.fullmonth), this.dataType)
      .then((it: DataModel) => {
        this.RateFullData = it;
      });
  }
  NavigateRate(type: string) {
    let navigationExtras: NavigationExtras = {
      state: {
        id: this.childProfiledata._id,
        typeRate: type,
        yearage: this.yearage,
        monthage: this.monthage,
        fullmonth: this.fullmonth,
      },
    };
    this.router.navigate(['rate'], navigationExtras);
  }
}
