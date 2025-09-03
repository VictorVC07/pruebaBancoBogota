import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Request, RequestStatus, ApprovalActionDto } from '../../../../core/Models/request.model';
import { RequestService } from '../../../../core/Service/request.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss']
})
export class RequestDetailsComponent implements OnInit {
  request: Request | null = null;
  loading = false;
  actionLoading = false;
  commentForm!: FormGroup;
  showCommentDialog = false;
  currentAction: 'approve' | 'reject' | null = null;
  RequestStatus = RequestStatus;

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private requestService: RequestService,
    private notificationService: NotificationService,
    private authService: AuthService 
  ) {}

  
  ngOnInit(): void {
    this.initializeCommentForm();
    this.loadRequest();
  }

  
  private initializeCommentForm(): void {
    this.commentForm = this.fb.group({
      comment: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    });
  }


  private loadRequest(): void {
    const requestId = this.route.snapshot.paramMap.get('id');
    if (!requestId) {
      this.notificationService.showError('Invalid request ID');
      this.router.navigate(['/requests']);
      return;
    }

    this.loading = true;
    this.requestService.getRequestById(requestId).subscribe({
      next: (request) => {
        this.request = request;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading request:', error);
        this.notificationService.showError('Failed to load request details');
        this.loading = false;
        this.router.navigate(['/requests']);
      }
    });
  }

  
  canPerformAction(): boolean {
    return this.request?.status === RequestStatus.PENDING;
  }

  
  getStatusSeverity(status: RequestStatus): string {
    switch (status) {
      case RequestStatus.PENDING:
        return 'warning';
      case RequestStatus.APPROVED:
        return 'success';
      case RequestStatus.REJECTED:
        return 'danger';
      default:
        return 'info';
    }
  }

  
  getTypeSeverity(type: string): string {
    switch (type) {
      case 'DEPLOYMENT':
        return 'info';
      case 'ACCESS':
        return 'warning';
      case 'TECHNICAL_CHANGE':
        return 'success';
      case 'INFRASTRUCTURE':
        return 'help';
      case 'SECURITY':
        return 'danger';
      case 'OTHER':
        return 'secondary';
      default:
        return 'info';
    }
  }


  openApprovalDialog(): void {
    this.currentAction = 'approve';
    this.commentForm.reset();
    this.showCommentDialog = true;
  }

  
  openRejectionDialog(): void {
    this.currentAction = 'reject';
    this.commentForm.reset();
    this.commentForm.get('comment')?.setValidators([Validators.required, Validators.minLength(10), Validators.maxLength(500)]);
    this.commentForm.get('comment')?.updateValueAndValidity();
    this.showCommentDialog = true;
  }

  confirmAction(): void {
    if (!this.request || !this.currentAction) return;

    if (this.currentAction === 'reject' && this.commentForm.invalid) {
      this.notificationService.showError('Please provide a valid comment for rejection');
      return;
    }

    const comment = this.commentForm.get('comment')?.value || '';
    const actionDto: ApprovalActionDto = { comment };

    this.actionLoading = true;

    const action$ = this.currentAction === 'approve' 
      ? this.requestService.approveRequest(this.request.id, actionDto)
      : this.requestService.rejectRequest(this.request.id, actionDto);

    action$.subscribe({
      next: () => {
        const actionText = this.currentAction === 'approve' ? 'approved' : 'rejected';
        this.notificationService.showSuccess(`Request ${actionText} successfully`);
        this.showCommentDialog = false;
        this.actionLoading = false;
        this.loadRequest(); 
      },
      error: (error) => {
        console.error(`Error ${this.currentAction}ing request:`, error);
        this.notificationService.showError(`Failed to ${this.currentAction} request`);
        this.actionLoading = false;
      }
    });
  }

  cancelAction(): void {
    this.showCommentDialog = false;
    this.currentAction = null;
    this.commentForm.reset();
  }

  goBack(): void {
    this.router.navigate(['/requests']);
  }

  
  isFieldInvalid(fieldName: string): boolean {
    const field = this.commentForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  
  getFieldError(fieldName: string): string {
    const field = this.commentForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) {
        return 'This field is required';
      }
      if (field.errors['minlength']) {
        return `Minimum length is ${field.errors['minlength'].requiredLength} characters`;
      }
      if (field.errors['maxlength']) {
        return `Maximum length is ${field.errors['maxlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  canApproveRequests(): boolean {
    return this.authService.canApproveRequests();
  }

  canShowApprovalActions(): boolean {
    return this.request?.status === RequestStatus.PENDING && this.canApproveRequests();
  }
}