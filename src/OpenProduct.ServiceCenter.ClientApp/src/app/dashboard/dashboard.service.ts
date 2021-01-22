import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Logger } from '../core/logger.service';
import { RepairNoteDashboardStats } from './models/repair-note-dashboard-stats';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private dashboardUri = 'api/dashboard';

  constructor(
    private logger: Logger,
    private http: HttpClient) { }

  loadDashboardStats(): Observable<RepairNoteDashboardStats> {
    return this.http
      .get<RepairNoteDashboardStats>(this.dashboardUri)
      .pipe(catchError(this.logger.handleError<RepairNoteDashboardStats>('loadDashboardStats')));
  }
}
