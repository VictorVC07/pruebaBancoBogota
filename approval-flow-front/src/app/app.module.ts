import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { CalendarModule } from 'primeng/calendar';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserSelectorComponent } from './shared/components/user-selector/user-selector.component';
import { NotificationBellComponent } from './shared/components/notification-bell/notification-bell.component';

@NgModule({
  declarations: [
    AppComponent, 
    UserSelectorComponent, 
    NotificationBellComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule, 
    HttpClientModule, 
    ReactiveFormsModule, 
    AppRoutingModule, 
    ButtonModule, 
    InputTextModule, 
    InputTextareaModule, 
    DropdownModule, 
    TableModule,  
    CardModule, 
    ToastModule, 
    ConfirmDialogModule, 
    ProgressSpinnerModule,
    TagModule, 
    CalendarModule, 
    PanelModule, 
    ToolbarModule 
  ],
  providers: [
    MessageService, 
    ConfirmationService 
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
