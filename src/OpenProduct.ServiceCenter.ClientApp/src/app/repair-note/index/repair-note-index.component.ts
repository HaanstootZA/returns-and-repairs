import { Component, Input, OnInit } from '@angular/core';
import { RepairNoteService } from '../repair-note.service';
import { RepairNote, RepairNoteLine } from '../models/repair-note';
import { Logger } from 'src/app/core/logger.service';

@Component({
  selector: 'rnt-index',
  templateUrl: './repair-note-index.component.html',
  styleUrls: ['./repair-note-index.component.scss']
})
export class RepairNoteIndexComponent implements OnInit {
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
    this.repairNoteService
    .getMostRecentRepairNotes()
    .subscribe((result: RepairNote[]) => this.repairNotes = result);
  }
}
