import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SnotifyService } from 'ng-snotify';
import * as CanvasJS from 'src/assets/js/canvasjs.min';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loading = false;
  data = [];

  constructor(private notify: SnotifyService, private router: Router, private Dashboard: DashboardService) { }

  ngOnInit() {
    this.loading = true;
    this.Dashboard.get().subscribe(
      result => {
        this.loading = false;
        this.data = result;
      },
      error => {
        this.loading = false;
        this.notify.error('Erro ao retornar os dados do dashboard', {timeout: 3000, showProgressBar: false });
      }
    );

    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      title: {
        text: 'Taxa de Ocupação das Oficinas'
      },
      axisY: {
        suffix: '%'
      },
      toolTip: {
        shared: true
      },
      data: [{
        type: 'stackedColumn100',
        name: 'Ocupado',
        color: '#ff7675',
        showInLegend: true,
        yValueFormatString: '#,##0\"%\"',
        dataPoints: [
          { label: 'Oficina 1', y: 50 },
          { label: 'Oficina 2', y: 40 },
          { label: 'Oficina 3', y: 30 },
          { label: 'Oficina 4', y: 45 },
          { label: 'Oficina 5', y: 2 }
        ]
      },
      {
        type: 'stackedColumn100',
        name: 'Total',
        color: '#3498db',
        showInLegend: true,
        yValueFormatString: '#,##0\"%\"',
        dataPoints: [
          { label: 'Oficina 1', y: 100 },
          { label: 'Oficina 2', y: 100 },
          { label: 'Oficina 3', y: 100 },
          { label: 'Oficina 4', y: 100 },
          { label: 'Oficina 5', y: 100 }
        ]
      }]
    });

    chart.render();

    const chart2 = new CanvasJS.Chart('chartContainer2', {
      theme: 'light2',
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Taxa de Ocupação das Oficinas'
      },
      data: [{
        type: 'pie',
        showInLegend: true,
        toolTipContent: '<b>{name}</b>: ${y} (#percent%)',
        indexLabel: '{name} - #percent%',
        dataPoints: [
          { y: 450, name: 'Food' },
          { y: 120, name: 'Insurance' },
          { y: 300, name: 'Traveling' },
          { y: 800, name: 'Housing' },
          { y: 150, name: 'Education' },
          { y: 150, name: 'Shopping'},
          { y: 250, name: 'Others' }
        ]
      }]
    });

    chart2.render();
  }
}
