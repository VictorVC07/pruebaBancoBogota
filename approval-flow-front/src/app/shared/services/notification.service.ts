import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly defaultLife = 3000; // Se oculta automáticamente después de 3 segundos

  constructor(private messageService: MessageService) {}

  showSuccess(message: string, title: string = 'Success'): void {
    this.messageService.add({
      severity: 'success',
      summary: title,
      detail: message,
      life: this.defaultLife 
    });
  }

  showError(message: string, title: string = 'Error'): void {
    this.messageService.add({
      severity: 'error',
      summary: title,
      detail: message,
      life: this.defaultLife                   
    });
  }

  showWarning(message: string, title: string = 'Warning'): void {
    this.messageService.add({
      severity: 'warn',
      summary: title,
      detail: message,
      life: this.defaultLife
    });
  }

  showInfo(message: string, title: string = 'Info'): void {
    this.messageService.add({
      severity: 'info',
      summary: title,
      detail: message,
      life: this.defaultLife 
    });
  }
}