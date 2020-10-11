import { Component, Input, OnInit, Output } from '@angular/core';
import { RepairNoteDashboardStats } from '../models/repair-note-dashboard-stats';
import { RepairNoteService } from '../repair-note.service';

@Component({
  selector: 'rnt-dashboard',
  templateUrl: './repair-note-dashboard.component.html',
  styleUrls: ['./repair-note-dashboard.component.scss']
})
export class RepairNoteDashboardComponent implements OnInit {
  @Input() public dashboardStats: RepairNoteDashboardStats;

  constructor(private repairNoteService: RepairNoteService) {
    this.dashboardStats = { statsCollection: new Map<string, number>() };
  }

  ngOnInit(): void {
    this.loadStats();
  }

  private loadStats(): void {
    this.repairNoteService.loadDashboardStats().subscribe((stats) => this.dashboardStats = stats);
  }
}
