import { Component, Input, OnInit } from '@angular/core';
import { RepairNoteService } from '../repair-note.service';
import { RepairNote } from '../models/repair-note';
import { Logger } from 'src/app/core/logger.service';
import { Observable, of, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'rnt-search',
  templateUrl: './repair-note-search.component.html',
  styleUrls: ['./repair-note-search.component.scss']
})
export class RepairNoteSearchComponent implements OnInit {
  private searchRepaiNoteIds = new Subject<string>();

  @Input() public previewRepairNotes$: Observable<string[]> = of([]);
  @Input() public foundRepairNotes: RepairNote[] | null = null;
  @Input() public selectedRepairNote: RepairNote | null = null;
  @Input() public displayPreview = false;

  // TODO: I'm still learning, so I'll first finish the TDD based stuff and get to the BDD stuff and E2E testing
  // TODO: As a service center employee to view a specific repair note I need to be able to do a search against captured repair notes
  constructor(
    private logger: Logger,
    private repairNoteService: RepairNoteService) {
  }

  public ngOnInit(): void {
    this.previewRepairNotes$ = this.searchRepaiNoteIds.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.repairNoteService.previewSearchRepairNote(term)),
    );
  }

  public onKeyUp(repairNoteId: string): void {
    this.logger.expectedBehaviour(`On key down view a list of possible repair notes that resemble ${repairNoteId}`);
    this.displayPreview = true;
    this.searchRepaiNoteIds.next(repairNoteId);
  }

  public onSearch(repairNoteId: string): void {
    this.logger.expectedBehaviour(`Provide a search button that will retrieve all repair notes that are related to ${repairNoteId}`);

    this.logger.unitOfWork(`Clear any searches that are still waiting to complete and block any further input until a result is returned`);    
    this.displayPreview = false;

    this.repairNoteService
      .searchRepairNote(repairNoteId)
      .subscribe((result: RepairNote[]) => {
        if (result && result.length > 0) {
          this.selectedRepairNote = result[0];
        }
        this.foundRepairNotes = result;
        this.logger.breakpoint(`restart preview searching`);
      });
  }

  public onSelect(repairNote: RepairNote): void {
    this.logger.unitOfWork('Display a selected repair note.');
    this.displayPreview = false;
    if (!this.foundRepairNotes) {
      this.logger.unitOfWork('No repair notes has been returned and the selected repair note is invalid.');
      return;
    }

    const foundRepairnote = this.foundRepairNotes.find((r, i, c) => r.id === repairNote.id);
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
