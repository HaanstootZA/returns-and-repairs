import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepairNoteDashboardComponent } from './repair-note-dashboard.component';

describe('DashboardComponent', () => {
  let component: RepairNoteDashboardComponent;
  let fixture: ComponentFixture<RepairNoteDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepairNoteDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairNoteDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
