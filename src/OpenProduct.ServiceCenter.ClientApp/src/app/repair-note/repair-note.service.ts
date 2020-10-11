import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  constructor(private logger: Logger) { }

  loadDashboardStats(): Observable<RepairNoteDashboardStats> {
    //return this.http.get<Hero[]>(this.heroesUrl)
    throw new Error('Method not implemented.');
  }

  getRepairNotes(): Observable<RepairNote[]> {
    //return this.http.get<Hero[]>(this.heroesUrl).pipe(catchError(this.handleError<Hero[]>('getHeroes', [])));
    throw new Error('Method not implemented.');
  }

  getRepairNote(id: string): Observable<RepairNote> {
    //return this.http.get<Hero[]>(this.heroesUrl)
    throw new Error('Method not implemented.');
  }

  getPreview(term: string): Observable<RepairNote[]> {
    throw new Error('Method not implemented.');
  }

  search(term: string): Observable<RepairNote | null> {
    throw new Error('Method not implemented.');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.logger.resolveError(`${operation} failed: ${error.message}`, new Error(error));
      return of<T>(result as T);
    };
  }
}
