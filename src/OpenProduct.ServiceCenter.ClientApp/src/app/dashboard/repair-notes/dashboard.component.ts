import { Component, Input, OnInit, Output } from '@angular/core';

import { RepairNoteStats } from '../models/repair-note-stats';
import { DashboardService } from '../dashboard.service';
import { Logger } from 'src/app/core/logger.service';

@Component({
  selector: 'dbrd-repairnote',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() public dashboardStats: RepairNoteStats;

  constructor(
    private logger: Logger,
    private dashboardService: DashboardService
  ) {
    this.dashboardStats = { statsCollection: new Map<string, number>() };
  }

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    this.dashboardService.loadDashboardStatistics().subscribe((stats) => this.dashboardStats = stats);
  }
}
