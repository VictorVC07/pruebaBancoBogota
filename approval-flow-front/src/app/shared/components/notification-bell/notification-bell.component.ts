import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, interval } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { RequestService } from '../../../core/Service/request.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-notification-bell',
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.css']
})
export class NotificationBellComponent implements OnInit, OnDestroy {
  pendingCount = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private requestService: RequestService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Solo mostrar para aprobadores
    if (this.authService.isApprover()) {
      this.loadPendingCount();
      
      // Actualizar el contador cada 10 segundos
      interval(10000)
        .pipe(
          takeUntil(this.destroy$),
          switchMap(() => this.requestService.getPendingRequestsCount())
        )
        .subscribe(count => {
          this.pendingCount = count;
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadPendingCount(): void {
    this.requestService.getPendingRequestsCount()
      .subscribe({
        next: (count) => {
          this.pendingCount = count;
        },
        error: (error) => {
          console.error('Error loading pending count:', error);
          this.pendingCount = 0;
        }
      });
  }

  isApprover(): boolean {
    return this.authService.isApprover();
  }
}