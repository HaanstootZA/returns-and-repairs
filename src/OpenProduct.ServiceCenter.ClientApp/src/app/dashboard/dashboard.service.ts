import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Logger } from '../core/logger.service';
import { RepairNoteStats } from './models/repair-note-stats';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardUri = 'api/dashboard/repairnotes';

  constructor(
    private logger: Logger,
    private http: HttpClient) { }

  loadDashboardStatistics(): Observable<RepairNoteStats> {
    return this.http
      .get<RepairNoteStats>(this.dashboardUri)
      .pipe(catchError(this.logger.handleError<RepairNoteStats>('loadDashboardStatistics')));
  }
}
