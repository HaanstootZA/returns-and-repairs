import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepairNoteIndexComponent } from './repair-note/repair-note-index.component';
import { RepairNoteSummaryComponent } from './repair-note/home/repair-note-summary.component';
import { RepairNoteCaptureComponent } from './repair-note/capture/repair-note-capture.component';
import { RepairNoteSearchComponent } from './repair-note/search/repair-note-search.component';
import { DashboardComponent } from './dashboard/repair-notes/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'repair-note', pathMatch: 'full' },
  {
    path: 'repair-note', component: RepairNoteIndexComponent,
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: RepairNoteSummaryComponent },
      { path: 'capture', component: RepairNoteCaptureComponent },
      { path: 'search', component: RepairNoteSearchComponent }
    ]
  },
  { path: 'dashboard/repair-notes', component: DashboardComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
