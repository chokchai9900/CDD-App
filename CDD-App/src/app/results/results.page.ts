import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { DBContextService } from '../services/dbcontext.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  @ViewChild('barCanvas') barCanvas: ElementRef;
  private barChart: Chart;
  public id : string;
  public currectData$ = Promise.resolve<any>([]) ; 
  public normalData : any;
  public m : any;

  public GM : number;
  public FM : number;
  public RL : number;
  public EL : number;
  public PS : number;

  public GMPass : boolean;
  public FMPass : boolean;
  public RLPass : boolean;
  public ELPass : boolean;
  public PSPass : boolean;

  constructor(private route: ActivatedRoute,private service: DBContextService,private router: Router) {
    Chart.register(...registerables);
    Chart.defaults.font.family = 'Kanit';
    Chart.defaults.color = 'white';
    Chart.defaults.font.size = 14;

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.id = this.router.getCurrentNavigation().extras.state.id;
      }
    });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const groupBy = key => array =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = obj[key];
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});
    console.log(this.id);
    this.currectData$ = this.service.getResultChildByID(this.id);
    this.currectData$.then((it : any) => {
      this.normalData = it;
      const groupByType = groupBy('rateType');
      this.m = groupByType(this.normalData.resultData);
      this.GM = this.relateData(this.m.GM[0].age);
      this.FM = this.relateData(this.m.FM[0].age);
      this.RL = this.relateData(this.m.RL[0].age);
      this.EL = this.relateData(this.m.EL[0].age);
      this.PS = this.relateData(this.m.PS[0].age);

      this.GMPass = this.m.GM[0].isPass;
      this.FMPass = this.m.FM[0].isPass;
      this.RLPass = this.m.RL[0].isPass;
      this.ELPass = this.m.EL[0].isPass;
      this.PSPass = this.m.PS[0].isPass;

      console.log(this.GMPass);
      console.log(this.FMPass);
      console.log(this.RLPass);
      console.log(this.ELPass);
      console.log(this.PSPass);

      this.barChart = new Chart(this.barCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: ['GM', 'FM', 'RL', 'EL', 'PS'],
          datasets: [
            {
              label: '',
              data: [this.GM, this.FM, this.RL, this.EL, this.PS],
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
          plugins:{
            legend:{
              display:false
            }
          },
          scales: {
            yAxes: {
              ticks: {
                callback: function (label, index, labels) {
                  switch (label) {
                    case 0:
                      return '';
                    case 1:
                      return '2 ปี 1 เดือน';
                    case 2:
                      return '2 ปี 6 เดือน';
                    case 3:
                      return '2 ปี 7 เดือน';
                    case 4:
                      return '3 ปี 1 เดือน';
                  }
                },
              },
            },
          },
        },
      });
      
    })
    
    
  }

  relateData(age : number){
    if (age <= 30) {
      return 1;
    }else if (age > 30 && age < 37) {
      return 2;
    }else if (age > 36 && age < 42) {
      return 3;
    }else if (age >= 42) {
      return 4;
    }
  }
}
