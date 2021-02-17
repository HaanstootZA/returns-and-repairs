import { Component, Input, OnInit } from '@angular/core';
import { RepairNoteService } from '../repair-note.service';
import { RepairNote } from '../models/repair-note';
import { Logger } from 'src/app/core/logger.service';

@Component({
  selector: 'rnt-summary',
  templateUrl: './repair-note-summary.component.html',
  styleUrls: ['./repair-note-summary.component.scss']
})
export class RepairNoteSummaryComponent implements OnInit {
  @Input() public repairNotes: RepairNote[] = [];
  @Input() public displayRepairNote = false;
  @Input() public selectedRepairNote: RepairNote = {
    id: 'Generate Id',
    capturer: 'Input Capturer',
    lines: []
  };

  constructor(
    private logger: Logger,
    private repairNoteService: RepairNoteService) { }

  ngOnInit(): void {
    this.loadMostRecent();
  }

  private loadMostRecent(): void {
    this.logger.expectedBehaviour('Loading the most recently captured repair notes.');

    this.repairNoteService
      .getMostRecentRepairNotes()
      .subscribe((result: RepairNote[]) => {
        this.repairNotes = result;
        if (result && result.length > 0) {
          this.displayRepairNote = true;
          this.selectedRepairNote = result[0];
        }
      });
  }

  public onSelect(repairNote: RepairNote): void {
    this.logger.unitOfWork('Select a repair note.');

    if (!this.repairNotes.find(r => r.id === repairNote.id)) {
      this.logger.breakpoint('An invalid repair note has been selected hiding the repair note details.');
      this.displayRepairNote = false;
      return;
    }

    this.displayRepairNote = true;
    this.selectedRepairNote = repairNote;
  }
}
