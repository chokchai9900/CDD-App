import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  @ViewChild('barCanvas') barCanvas: ElementRef;
  private barChart: Chart;

  constructor() {
    Chart.register(...registerables);
    Chart.defaults.font.family = 'Kanit';
    Chart.defaults.color = 'white';
    Chart.defaults.font.size = 14;
  }

  ngOnInit() {}
  ionViewDidEnter() {
    this.mycharts();
  }

  mycharts() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['GM', 'FM', 'RL', 'EL', 'PS'],
        datasets: [
          {
            label: '',
            data: [1, 2, 3, 1, 4],
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
  }
}
