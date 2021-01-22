import { Component, Input, OnInit, Output } from '@angular/core';

import { RepairNoteDashboardStats } from '../models/repair-note-dashboard-stats';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'rnt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class RepairNoteDashboardComponent implements OnInit {
  @Input() public dashboardStats: RepairNoteDashboardStats;

  constructor(private dashboardService: DashboardService) {
    this.dashboardStats = { statsCollection: new Map<string, number>() };
  }

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    this.dashboardService.loadDashboardStats().subscribe((stats) => this.dashboardStats = stats);
  }
}
