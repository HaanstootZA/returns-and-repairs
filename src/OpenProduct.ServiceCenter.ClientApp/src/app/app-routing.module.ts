import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/repair-notes/dashboard.component';
import { RepairNoteDetailComponent } from './repair-note/detail/repair-note-detail.component';
import { RepairNoteCaptureComponent } from './repair-note/capture/repair-note-capture.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RepairNoteIndexComponent } from './repair-note/index/repair-note-index.component';
import { RepairNoteSearchComponent } from './repair-note/search/repair-note-search.component';

const routes: Routes = [
  { path: '',   redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'repair-note', redirectTo: 'repair-note/index', pathMatch: 'full' },
  { path: 'repair-note/detail', component: RepairNoteDetailComponent },
  { path: 'repair-note/capture', component: RepairNoteCaptureComponent },
  { path: 'repair-note/search', component: RepairNoteSearchComponent },
  { path: 'repair-note/index', component: RepairNoteIndexComponent },

  { path: 'dashboard/repair-notes', component: DashboardComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
