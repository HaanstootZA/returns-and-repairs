import { AbstractType } from '@angular/core';
import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RepairNote } from '../models/repair-note';
import { RepairNoteService } from '../repair-note.service';
import { RepairNoteDetailComponent } from './repair-note-detail.component';

describe('RepairNoteDetailComponent', () => {
  let component: RepairNoteDetailComponent;
  let fixture: ComponentFixture<RepairNoteDetailComponent>;
  let repairNoteServiceSpy: jasmine.SpyObj<RepairNoteService>;
  let repairNote: RepairNote;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj<RepairNoteService>({
      getRepairNote: of()
    });

    TestBed.configureTestingModule({
      providers: [{
        provide: ActivatedRoute,
        useValue: { queryParams: of({ params: {} }) },
      }, {
        provide: RepairNoteService,
        useValue: spy
      }],
      declarations: [RepairNoteDetailComponent]
    });

    repairNote = {
      id: 'TestId',
      capturer: 'Test Çapturer',
      lines: [{
        partNumber: 'TestPart1',
        quantity: 10
      }]
    };

    repairNoteServiceSpy = TestBed.inject(RepairNoteService) as jasmine.SpyObj<RepairNoteService>;

    await TestBed.compileComponents();
    fixture = TestBed.createComponent(RepairNoteDetailComponent);
    component = fixture.componentInstance;
    component.repairNote = repairNote;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate a default repair note', () => {
    expect(component.repairNote).toBeDefined();
  });

  it('should instantiate the event emitter', () => {
    expect(component.lineSelected).toBeDefined();
  });

  it('should change the selected line', () => {
    component.selectLine(component.repairNote.lines[0]);
    expect(component.selectedLine).toEqual(component.repairNote.lines[0]);
  });

  it('should set the id label inner text', () => {
    const element = fixture.nativeElement.querySelector('.id') as HTMLElement;
    expect(element).toBeDefined();
    expect(element.innerText).toContain(repairNote.id);
  });

  it('should set the capturer label inner text', () => {
    const element = fixture.nativeElement.querySelector('.capturer') as HTMLElement;
    expect(element).toBeDefined();
    expect(element.innerText).toContain(repairNote.capturer);
  });

  it('should have a line item', () => {
    const listItem = fixture.nativeElement.querySelector('li') as HTMLDataListElement;
    expect(listItem).toBeDefined();
  });

  it('should have a line item with label part number inner text set', () => {
    const partNumberLabel = fixture.nativeElement.querySelector('.line-part') as HTMLElement;
    expect(partNumberLabel.innerText).toContain(repairNote.lines[0].partNumber);
  });

  it('should have a line item with label quantity inner text set', () => {
    const partNumberLabel = fixture.nativeElement.querySelector('.line-quantity') as HTMLElement;
    expect(partNumberLabel.innerText).toContain(component.repairNote.lines[0].quantity.toString());
  });

  it('should emit a line selected event', () => {
    spyOn(component.lineSelected, 'emit');

    const listItem = fixture.nativeElement.querySelector('li') as HTMLDataListElement;
    listItem.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(component.lineSelected.emit).toHaveBeenCalled();
  });
});
