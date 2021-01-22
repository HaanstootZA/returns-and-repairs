import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { RepairNoteDashboardComponent } from './repair-notes/dashboard.component';

@NgModule({
  declarations: [
    RepairNoteDashboardComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  exports: [
    RepairNoteDashboardComponent
  ]
})
export class RepairNotesModule { }
