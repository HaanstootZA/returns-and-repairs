import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RepairNoteService } from '../repair-note.service';
import { RepairNote } from '../models/repair-note';

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

  constructor(private repairNoteService: RepairNoteService) { }

  ngOnInit(): void {
    this.loadMostRecent();
  }

  private loadMostRecent(): void {
    this.repairNotes = [];
    if (this.repairNotes.length > 0) {
      this.displayRepairNote = true;
      this.selectedRepairNote = this.repairNotes[0];
    }
  }
}
