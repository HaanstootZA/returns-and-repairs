import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ObservedValueOf, OperatorFunction } from 'rxjs/internal/types';
import { catchError, map, tap } from 'rxjs/operators';
import { Logger } from '../core/logger.service';

import { RepairNote } from './models/repair-note';

@Injectable({
  providedIn: 'root'
})

export class RepairNoteService {
  private defaultUri = 'api/repairNote';
  private searchUri = 'api/repairNote/search';
  private mostRecentUri = 'api/repairNotes';
  private previewSearchUri = 'api/repairNotes/search';

  constructor(
    private logger: Logger,
    private http: HttpClient) { }


  getRepairNote(id: string): Observable<RepairNote> {
    const params = new HttpParams().set('id', id);
    return this.http
      .get<RepairNote>(this.defaultUri, { params })
      .pipe(catchError(this.logger.handleError<RepairNote>('getRepairNote')));
  }

  searchRepairNote(term: string): Observable<RepairNote | null> {
    const params = new HttpParams().set('term', term);

    //ADD A DELAY TO AVOID SEARCHING THE WHOLE TIME
    return this.http
      .get<RepairNote>(this.searchUri, { params })
      .pipe(catchError(this.logger.handleError<RepairNote>('searchRepairNote')));
  }

  getMostRecentRepairNotes(): Observable<RepairNote[]> {
    return this.http
      .get<RepairNote[]>(this.mostRecentUri)
      .pipe(catchError(this.logger.handleError<RepairNote[]>('getMostRecentRepairNotes')));
  }

  previewSearchRepairNote(term: string): Observable<RepairNote[]> {
    const params = new HttpParams().set('term', term);

    //ADD A DELAY TO AVOID SEARCHING THE WHOLE TIME
    return this.http
      .get<RepairNote[]>(this.previewSearchUri, { params })
      .pipe((r) => r ?? [] as RepairNote[])
      .pipe(catchError(this.logger.handleError<RepairNote[]>('previewSearchRepairNote')));
  }
}
