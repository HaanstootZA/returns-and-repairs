import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RepairNote } from './models/repair-note';
import { RepairNoteDashboardStats } from './models/repair-note-dashboard-stats';

@Injectable({
  providedIn: 'root'
})

export class RepairNoteService {
  constructor() { }

  loadDashboardStats(): Observable<RepairNoteDashboardStats> {
    throw new Error('Method not implemented.');
  }

  getRepairNotes(): Observable<RepairNote[]> {
    throw new Error('Method not implemented.');
  }

  getRepairNote(id: string): Observable<RepairNote> {
    throw new Error('Method not implemented.');
  }
}
