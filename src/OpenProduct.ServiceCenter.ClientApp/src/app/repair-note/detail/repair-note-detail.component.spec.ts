import { ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { RepairNoteDetailComponent } from './repair-note-detail.component';

describe('RepairNoteComponent', () => {
  let component: RepairNoteDetailComponent;
  let fixture: ComponentFixture<RepairNoteDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepairNoteDetailComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairNoteDetailComponent);
    component = fixture.componentInstance;
    component.repairNote = {
      id: 'TestId',
      capturer: 'Test Çapturer',
      lines: [{
        partNumber: 'TestPart1',
        quantity: 10
      }]
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should instantiate a repair note', () => {
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
    expect(element.innerText).toContain(component.repairNote.id);
  });

  it('should set the capturer label inner text', () => {
    const element = fixture.nativeElement.querySelector('.capturer') as HTMLElement;
    expect(element).toBeDefined();
    expect(element.innerText).toContain(component.repairNote.capturer);
  });

  it('should have a line item', () => {
    const listItem = fixture.nativeElement.querySelector('li') as HTMLDataListElement;
    expect(listItem).toBeDefined();
  });

  it('should have a line item with label part number inner text set', () => {
    const partNumberLabel = fixture.nativeElement.querySelector('.line-part-number') as HTMLElement;
    expect(partNumberLabel.innerText).toContain(component.repairNote.lines[0].partNumber);
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
