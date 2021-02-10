import { Component, Input, OnInit } from '@angular/core';
import { RepairNoteService } from '../repair-note.service';
import { RepairNote } from '../models/repair-note';
import { Logger } from 'src/app/core/logger.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'rnt-summary',
  templateUrl: './repair-note-summary.component.html',
  styleUrls: ['./repair-note-summary.component.scss']
})
export class RepairNoteSummaryComponent implements OnInit {
  public repairNotes: RepairNote[] = [];
  public selectedRepairNote: RepairNote | null = null;

  constructor(
    private logger: Logger,
    private repairNoteService: RepairNoteService) { }

  ngOnInit(): void {
    this.logger.expectedBehaviour('Loading the most recently captured repair notes.');

    this.repairNoteService
      .getMostRecentRepairNotes()
      .subscribe((result: RepairNote[]) => {
        if (!result) {
          return;
        }
        this.repairNotes = result;
        if (result.length > 0) {
          this.selectedRepairNote = this.repairNotes[0];
        }
      });
  }

  public onSelect(repairNote: RepairNote): void {
    this.logger.unitOfWork('Selecting a repair note.');
    const foundRepairnote = this.repairNotes.find((r, i, c) => r.id === repairNote.id);
    this.logger.breakpoint(`Found repair note ${foundRepairnote?.id} for ${repairNote.id}.`);

    if (foundRepairnote) {
      this.logger.unitOfWork('A valid repair note has been requested, selecting repair note.');
      this.selectedRepairNote = foundRepairnote;
      return;
    }

    this.logger.breakpoint('An invalid repair note has been selected hiding the repair note details.');
    this.selectedRepairNote = null;
  }
}
