import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RequestService } from '../../../../core/Service/request.service';
import { RequestTypeService } from '../../../../core/Service/request-type.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { RequestType, RequestTypeOption } from '../../../../core/Models/request.model';


@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit, OnDestroy {
  requestForm!: FormGroup;
  loading = false;
  loadingTypes = false;
  private destroy$ = new Subject<void>();

  requestTypes: RequestTypeOption[] = [];

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private requestTypeService: RequestTypeService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.checkPermissions()) {
      return; 
    }
    
    // Verificar permisos cada segundo para detectar cambios de usuario
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.checkPermissions();
      });

    this.initializeForm();
    this.loadRequestTypes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadRequestTypes(): void {
    this.loadingTypes = true;
    this.requestTypeService.getRequestTypes()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (types) => {
          this.requestTypes = types;
          this.loadingTypes = false;
        },
        error: (error) => {
          console.error('Error loading request types:', error);
          this.loadingTypes = false;
        }
      });
  }

  private checkPermissions(): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'REQUESTER') {
      this.notificationService.showError(
        'You do not have permission to create requests',
        'Access Denied'
      );
      this.router.navigate(['/requests']);
      return false;
    }
    return true;
  }

  private initializeForm(): void {
    const currentUserEmail = this.authService.getCurrentUserEmail();
    const defaultApprover = 'aprobador@bancobogota.com';
    
    this.requestForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      requester: [currentUserEmail || '', [Validators.required, Validators.email]],
      approver: [defaultApprover, [Validators.required, Validators.email]],
      requestType: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.requestForm.valid) {
      this.loading = true;
      
      this.requestService.createRequest(this.requestForm.value).subscribe({
        next: (response) => {
          this.notificationService.showSuccess(
            'Request created successfully!',
            'Success'
          );
          this.router.navigate(['/requests']);
        },
        error: (error) => {
          this.notificationService.showError(
            error.message || 'Failed to create request',
            'Error'
          );
          this.loading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.requestForm.controls).forEach(key => {
      const control = this.requestForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.requestForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.requestForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return `${fieldName} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['minlength']) {
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['maxlength']) {
        return `${fieldName} must not exceed ${field.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  onCancel(): void {
    this.router.navigate(['/requests']);
  }
}