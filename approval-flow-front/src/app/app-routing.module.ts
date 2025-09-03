import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from './core/guards/role.guard';
import { UserRole } from './shared/services/auth.service';
import { RequestsListComponent } from './features/requests/pages/requests-list/requests-list.component';
import { CreateRequestComponent } from './features/requests/pages/create-request/create-request.component';
import { RequestDetailsComponent } from './features/requests/pages/request-details/request-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/requests',
    pathMatch: 'full'
  },
  {
    path: 'requests',
    loadChildren: () => import('./features/requests/requests.module').then(m => m.RequestsModule)
  },
  {
    path: '**',
    redirectTo: '/requests'
  }
];

// En el módulo de requests:
const requestRoutes: Routes = [
  {
    path: '',
    component: RequestsListComponent
  },
  {
    path: 'create',
    component: CreateRequestComponent,
    canActivate: [RoleGuard],
    data: { roles: [UserRole.APPROVER, UserRole.REQUESTER] }
  },
  {
    path: ':id',
    component: RequestDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
