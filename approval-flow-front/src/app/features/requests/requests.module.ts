import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { PaginatorModule } from 'primeng/paginator';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TooltipModule } from 'primeng/tooltip';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { RequestsRoutingModule } from './requests-routing.module';
import { CreateRequestComponent } from './pages/create-request/create-request.component';
import { RequestsListComponent } from './pages/requests-list/requests-list.component';
import { RequestDetailsComponent } from './pages/request-details/request-details.component';

@NgModule({
  declarations: [
    CreateRequestComponent,
    RequestsListComponent,
    RequestDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RequestsRoutingModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    TableModule,
    CardModule,
    TagModule,
    PanelModule,
    ToolbarModule,
    PaginatorModule,
    ProgressSpinnerModule,
    TooltipModule,
    DialogModule,
    ConfirmDialogModule
  ]
})
export class RequestsModule { }