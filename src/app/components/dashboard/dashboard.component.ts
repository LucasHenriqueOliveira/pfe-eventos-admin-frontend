import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';
import { SnotifyService } from 'ng-snotify';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loading = false;
  data: any = [];

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
  }
}
