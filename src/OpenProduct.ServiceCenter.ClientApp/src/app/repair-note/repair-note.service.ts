import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ObservedValueOf, OperatorFunction } from 'rxjs/internal/types';
import { catchError, map, tap } from 'rxjs/operators';
import { Logger } from '../core/logger.service';

import { RepairNote } from './models/repair-note';
import { RepairNoteDashboardStats } from './models/repair-note-dashboard-stats';

@Injectable({
  providedIn: 'root'
})

export class RepairNoteService {
  private defaultUri = 'api/repairNotes';
  private dashboardUri = 'api/repairNotes/dashboard';
  private searchUri = 'api/repairNotes/search';

  constructor(
    private logger: Logger,
    private http: HttpClient) { }

  loadDashboardStats(): Observable<RepairNoteDashboardStats> {
    //return this.http.get<RepairNoteDashboardStats>(this.dashboardUri)
    throw new Error('Method not implemented.');
  }

  getRepairNotes(): Observable<RepairNote[]> {
    return this.http
      .get<RepairNote[]>(this.defaultUri)
      .pipe((catchError)(this.handleError<RepairNote[]>('getRepairNotes', [])));
  }

  getRepairNote(id: string): Observable<RepairNote> {
    // return this.http.get<RepairNote[]>(this.heroesUrl).pipe((catchError)(this.handleError<RepairNote[]>('getRepairNote', [])));
    throw new Error('Method not implemented.');
  }

  getPreview(term: string): Observable<RepairNote[]> {
    throw new Error('Method not implemented.');
  }

  search(term: string): Observable<RepairNote | null> {
    throw new Error('Method not implemented.');
  }

  private handleError<T>(operation = 'operation', result?: T): OperatorFunction<T, T> {
    // tslint:disable-next-line: no-any
    return (error: any): Observable<T> => {
      this.logger.resolveError(`${operation} failed: ${error.message}`, new Error(error));
      return throwError('An error has occurred while trying to access an HTTP server');
    };
  }
}
