import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestsListComponent } from './pages/requests-list/requests-list.component';
import { CreateRequestComponent } from './pages/create-request/create-request.component';
import { RequestDetailsComponent } from './pages/request-details/request-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: RequestsListComponent
  },
  {
    path: 'create',
    component: CreateRequestComponent
  },
  {
    path: ':id',
    component: RequestDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }