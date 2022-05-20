import { Component, OnInit } from '@angular/core';
import {StatisticalManagementService} from '../../../../service/admin/statistical-management.service';

// import { StatisticalManagementService } from 'src/app/service/admin/statistical-management/statistical-management.service';

@Component({
  selector: 'app-movie-statistics',
  templateUrl: './movie-statistics.component.html',
  styleUrls: ['./movie-statistics.component.css']
})
export class MovieStatisticsComponent implements OnInit {

  chartHideTop = false;
  multiAxisDataTop: any;
  multiAxisOptionsTop: any;
  movieTop = 5;

  // tslint:disable-next-line:variable-name
  constructor(private statisticalService: StatisticalManagementService) { }

  ngOnInit(): void {
    this.onMovieTop();
  }

  onMovieTop() {
    this.statisticalService.getTopMovie(this.movieTop).subscribe(data => {
      this.initDataTop();
      if (data != null) {
        for (const item of data) {
          this.multiAxisDataTop.labels.push(item.movieName);
          this.multiAxisDataTop.datasets[0].data.push(item.ticketQuantity);
          this.multiAxisDataTop.datasets[1].data.push(item.revenue);
        }
        this.chartHideTop = false;
      } else {
        this.chartHideTop = true;
      }
    });
    this.initMultiAxisOptionsTop();
  }

  initDataTop() {
    this.multiAxisDataTop = {
      labels: [],
      datasets: [{
        label: 'Số vé (Vé)',
        backgroundColor: '#42A5F5',
        yAxisID: 'y-axis-1',
        data: []
      }, {
        label: 'Doanh thu (VND)',
        backgroundColor: '#FFA726',
        yAxisID: 'y-axis-2',
        data: []
      }]
    };
  }

  initMultiAxisOptionsTop() {
    this.multiAxisOptionsTop = {
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: true
      },
      scales: {
        yAxes: [{
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
          ticks: {
            min: 0,
            precision: 0
          }
        },
          {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',
            gridLines: {
              drawOnChartArea: false
            },
            ticks: {
              min: 0,
              precision: 0,
              callback(value, index, values) {
                return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
              }
            }
          }]
      }
    };
  }
}
