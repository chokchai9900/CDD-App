import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { DBContextService } from '../services/dbcontext.service';
import { ResultModel, RateResultModel } from '../Models/ResultModel';
import { DataModel } from '../Models/RateDataModel';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  @ViewChild('barCanvas') barCanvas: ElementRef;
  private barChart: Chart;
  public data: ResultModel;

  public GM_Value = 0;
  public FM_Value = 0;
  public RL_Value = 0;
  public EL_Value = 0;
  public PS_Value = 0;

  public GMPass = false;
  public FMPass = false;
  public RLPass = false;
  public ELPass = false;
  public PSPass = false;

  constructor(
    private route: ActivatedRoute,
    private service: DBContextService,
    private router: Router
  ) {
    Chart.register(...registerables);
    Chart.defaults.font.family = 'Kanit';
    Chart.defaults.color = 'white';
    Chart.defaults.font.size = 14;

    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.data;
      }
    });
  }

  ngOnInit() {
    var x = this.data.resultData.sort((a, b) => (a.age > b.age ? 1 : -1));

    var maxval = x[x.length -1].age;
    console.log(maxval);
    

    this.func(x,maxval);

    console.log(x);

    var showResult = [
      this.GM_Value,
      this.FM_Value,
      this.RL_Value,
      this.EL_Value,
      this.PS_Value,
    ].sort((a, b) => (a < b ? 1 : -1))[0];

    console.log(showResult);

    this.validateResult(this.GM_Value, showResult, 'GM');
    this.validateResult(this.FM_Value, showResult, 'FM');
    this.validateResult(this.RL_Value, showResult, 'RL');
    this.validateResult(this.EL_Value, showResult, 'EL');
    this.validateResult(this.PS_Value, showResult, 'PS');

    console.log(this.GMPass);
    console.log(this.FMPass);
    console.log(this.RLPass);
    console.log(this.ELPass);
    console.log(this.PSPass);


    console.log("test value");
    
    console.log(this.GM_Value);
    console.log(this.FM_Value);
    console.log(this.RL_Value);
    console.log(this.EL_Value);
    console.log(this.PS_Value);
    console.log(showResult);
  } 

  func(x: RateResultModel[],maxval : string){

    var val = Number(maxval);
    if (val >= 30) {
      console.log("Age 30");
      if (!x.some(it => it.isPass === false && Number(it.age) <= 30 && it.rateType === "GM") && x.find(it => Number(it.age) <= 30 && it.rateType === "GM")) {
        this.GM_Value = 1;
      }
      if (!x.some(it => it.isPass === false && Number(it.age) <= 30 && it.rateType === "FM") && x.find(it => Number(it.age) <= 30 && it.rateType === "FM")) {
        this.FM_Value = 1;
      }
      if (!x.some(it => it.isPass === false && Number(it.age) <= 30 && it.rateType === "RL") && x.find(it => Number(it.age) <= 30 && it.rateType === "RL")) {
        this.RL_Value = 1;
      }
      if (!x.some(it => it.isPass === false && Number(it.age) <= 30 && it.rateType === "EL") && x.find(it => Number(it.age) <= 30 && it.rateType === "EL")) {
        this.EL_Value = 1;
      }
      if (!x.some(it => it.isPass === false && Number(it.age) <= 30 && it.rateType === "PS") && x.find(it => Number(it.age) <= 30 && it.rateType === "PS")) {
        this.PS_Value = 1;
      }
    }
    if (val > 30 ) {
      console.log("Age 31-36");
      if (!x.some(it => it.isPass === false && Number(it.age) > 30 && Number(it.age) < 37 && it.rateType === "GM") && x.find(it => Number(it.age) > 30 && Number(it.age) < 37 && it.rateType === "GM")) {
        this.GM_Value = 2;
      }
      if (!x.some(it => it.isPass === false && Number(it.age) > 30 && Number(it.age) < 37 && it.rateType === "FM") && x.find(it => Number(it.age) > 30 && Number(it.age) < 37 && it.rateType === "FM")) {
        this.FM_Value = 2;
      }
      if (!x.some(it => it.isPass === false && Number(it.age) > 30 && Number(it.age) < 37 && it.rateType === "RL") && x.find(it => Number(it.age) > 30 && Number(it.age) < 37 && it.rateType === "RL")) {
        this.RL_Value = 2;
      }
      if (!x.some(it => it.isPass === false && Number(it.age) > 30 && Number(it.age) < 37 && it.rateType === "EL") && x.find(it => Number(it.age) > 30 && Number(it.age) < 37 && it.rateType === "EL")) {
        this.EL_Value = 2;
      }
      if (!x.some(it => it.isPass === false && Number(it.age) > 30 && Number(it.age) < 37 && it.rateType === "PS") && x.find(it => Number(it.age) > 30 && Number(it.age) < 37 && it.rateType === "PS")) {
        this.PS_Value = 2;
      }
    } 
    if (val > 36 ) {
      console.log("Age 37-41");
      if (!x.some(it => it.isPass === false && Number(it.age) > 36 && Number(it.age) < 42 && it.rateType === "GM") && x.find(it => Number(it.age) > 36 && Number(it.age) < 42 && it.rateType === "GM")) {
        this.GM_Value = 3;
      }
      if (!x.some(it => it.isPass === false && Number(it.age) > 36 && Number(it.age) < 42 && it.rateType === "FM") && x.find(it => Number(it.age) > 36 && Number(it.age) < 42 && it.rateType === "FM")) {
        this.FM_Value = 3;
      }
      if (!x.some(it => it.isPass === false && Number(it.age) > 36 && Number(it.age) < 42 && it.rateType === "RL") && x.find(it => Number(it.age) > 36 && Number(it.age) < 42 && it.rateType === "RL")) {
        this.RL_Value = 3;
      }
      if (!x.some(it => it.isPass === false && Number(it.age) > 36 && Number(it.age) < 42 && it.rateType === "EL") && x.find(it => Number(it.age) > 36 && Number(it.age) < 42 && it.rateType === "EL")) {
        this.EL_Value = 3;
      }
      if (!x.some(it => it.isPass === false && Number(it.age) > 36 && Number(it.age) < 42 && it.rateType === "PS") && x.find(it => Number(it.age) > 36 && Number(it.age) < 42 && it.rateType === "PS")) {
        this.PS_Value = 3;
      }
    } 
    if (val >= 42) {
      console.log("Age 42");
      if (!x.some(it => it.isPass === false && Number(it.age) >= 42 && it.rateType === "GM") && x.find(it => Number(it.age) >= 42 && it.rateType === "GM")) {
        this.GM_Value = 4;
      }
      if (!x.some(it => it.isPass === false && Number(it.age) >= 42 && it.rateType === "FM") && x.find(it => Number(it.age) >= 42 && it.rateType === "FM")) {
        this.FM_Value = 4;
      }
      if (!x.some(it => it.isPass === false && Number(it.age) >= 42 && it.rateType === "RL") && x.find(it => Number(it.age) >= 42 && it.rateType === "RL")) {
        this.RL_Value = 4;
      }
      if (!x.some(it => it.isPass === false && Number(it.age) >= 42 && it.rateType === "EL") && x.find(it => Number(it.age) >= 42 && it.rateType === "EL")) {
        this.EL_Value = 4;
      }
      if (!x.some(it => it.isPass === false && Number(it.age) >= 42 && it.rateType === "PS") && x.find(it => Number(it.age) >= 42 && it.rateType === "PS")) {
        this.PS_Value = 4;
      }
    }
  }

  onclickt(type: string, result: boolean) {
    var passResult = '';
    if (result) {
      passResult = 'pass';
    } else {
      passResult = 'not-pass';
    }
    var max = this.data.resultData
      .sort((a, b) => (a.age < b.age ? 1 : -1))
      .find((it) => it.rateType == type);
    this.service
      .getRateDataByAgeValidate(max.age, max.rateType)
      .then((it: DataModel[]) => {
        let navigationExtras: NavigationExtras = {
          state: {
            data: it,
          },
        };
        console.log(it);

        this.router.navigate([passResult], navigationExtras);
      });
    console.log(max);
    console.log(type);
  }

  validateResult(x: number, y: number, stage: string) {
    switch (stage) {
      case 'GM': {
        if (x != y) {
          this.GMPass = false;
        } else if (x == y) {
          this.GMPass = true;
        }
        break;
      }
      case 'FM': {
        if (x != y) {
          this.FMPass = false;
        } else if (x == y) {
          this.FMPass = true;
        }
        break;
      }
      case 'RL': {
        if (x != y) {
          this.RLPass = false;
        } else if (x == y) {
          this.RLPass = true;
        }
        break;
      }
      case 'EL': {
        if (x != y) {
          this.ELPass = false;
        } else if (x == y) {
          this.ELPass = true;
        }
        break;
      }
      case 'PS': {
        if (x != y) {
          this.PSPass = false;
        } else if (x == y) {
          this.PSPass = true;
        }
        break;
      }
      default: {
        //statements;
        break;
      }
    }
  }

  ionViewWillEnter() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['GM', 'FM', 'RL', 'EL', 'PS'],
        datasets: [
          {
            label: '',
            data: [
              this.GM_Value,
              this.FM_Value,
              this.RL_Value,
              this.EL_Value,
              this.PS_Value,
            ],
            backgroundColor: [
              '#f5b7b1',
              '#d7bde2',
              '#aed6f1',
              '#a2d9ce',
              '#f9e79f',
              // "rgba(255, 159, 64, 0.2)"
            ],
            // borderColor: [
            //   "rgba(255,99,132,1)",
            //   "rgba(54, 162, 235, 1)",
            //   "rgba(255, 206, 86, 1)",
            //   "rgba(75, 192, 192, 1)",
            //   "rgba(153, 102, 255, 1)",
            //   "rgba(255, 159, 64, 1)"
            // ],
            // borderWidth: 1
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            enabled: false,
          },
          legend: {
            display: false,
          },
        },
        scales: {
          yAxes: {
            ticks: {
              callback: function (label, index, labels) {
                switch (label) {
                  case 0:
                    return '';
                  case 1:
                    return '2 ปี 6 เดือน';
                  case 2:
                    return '2 ปี 7 เดือน';
                  case 3:
                    return '3 ปี 1 เดือน';
                  case 4:
                    return '3 ปี 6 เดือน';
                }
              },
            },
          },
        },
      },
    });
  }

  relateData(age: number) {
    if (age <= 30) {
      return 1;
    } else if (age > 30 && age < 37) {
      return 2;
    } else if (age > 36 && age < 42) {
      return 3;
    } else if (age >= 42) {
      return 4;
    }
  }
}
