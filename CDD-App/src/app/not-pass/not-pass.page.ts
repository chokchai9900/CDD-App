import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AfterRateModel, DataModel } from '../Models/RateDataModel';
import { AudioService } from '../services/audio.service';
import { DBContextService } from '../services/dbcontext.service';

@Component({
  selector: 'app-not-pass',
  templateUrl: './not-pass.page.html',
  styleUrls: ['./not-pass.page.scss'],
})
export class NotPassPage implements OnInit {

  public AfterRateData : any;
  public childId : string;
  public fullmonth: number;
  private dataType : string;
  public RateResultData: DataModel[];

  constructor(private route: ActivatedRoute, private router: Router,private service: DBContextService,private audio: AudioService) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.RateResultData = this.router.getCurrentNavigation().extras.state.data;
      }
    });
  }

  ngOnInit() {
    console.log(this.RateResultData);
    
    this.audio.preload('notpass', 'assets/not-pass.m4a');
    this.audio.play('notpass');
  }

}
