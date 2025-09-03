import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Request, RequestStatus, RequestType } from '../../../../core/Models/request.model';
import { RequestService, RequestFilters, PagedResponse } from '../../../../core/Service/request.service';
import { NotificationService } from '../../../../shared/services/notification.service';
import { AuthService } from '../../../../shared/services/auth.service';

interface FilterOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss']
})
export class RequestsListComponent implements OnInit, OnDestroy {
  requests: Request[] = [];
  loading = false;
  totalRecords = 0;
  currentPage = 1;
  pageSize = 5;
  
  filters: RequestFilters = {
    status: undefined,
    requestType: undefined,
    requester: undefined,
    approver: undefined
  };
  
  private filterSubject = new Subject<void>();
  private destroy$ = new Subject<void>();
  
  statusOptions: FilterOption[] = [
    { label: 'Pending', value: RequestStatus.PENDING },
    { label: 'Approved', value: RequestStatus.APPROVED },
    { label: 'Rejected', value: RequestStatus.REJECTED }
  ];
  
  typeOptions: FilterOption[] = [
    { label: 'Deployment', value: RequestType.DEPLOYMENT },
    { label: 'Access', value: RequestType.ACCESS },
    { label: 'Technical Change', value: RequestType.TECHNICAL_CHANGE },
    { label: 'Infrastructure', value: RequestType.INFRASTRUCTURE },
    { label: 'Security', value: RequestType.SECURITY },
    { label: 'Other', value: RequestType.OTHER }
  ];

  constructor(
    private requestService: RequestService,
    private notificationService: NotificationService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setupFilterDebounce();
    this.loadRequests();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupFilterDebounce(): void {
    this.filterSubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.currentPage = 1;
        this.loadRequests();
      });
  }

  loadRequests(): void {
    this.loading = true;
    
    const cleanFilters: RequestFilters = {};
    
    if (this.filters.status) {
      cleanFilters.status = this.filters.status;
    }
    if (this.filters.requestType) {
      cleanFilters.requestType = this.filters.requestType;
    }
    
    if (this.filters.requester && this.filters.requester.trim()) {
      cleanFilters.requester = this.filters.requester.trim();
    }
    if (this.filters.approver && this.filters.approver.trim()) {
      cleanFilters.approver = this.filters.approver.trim();
    }
    
    console.log('Filters being sent:', cleanFilters);
    
    this.requestService.getAllRequests(this.currentPage, this.pageSize, cleanFilters)
      .subscribe({
        next: (response: PagedResponse<Request>) => {
          this.requests = response.data;
          this.totalRecords = response.totalRecords;
          this.loading = false;
        }
      });
  }

  onPageChange(event: any): void {
    this.currentPage = (event.first / event.rows) + 1;
    this.pageSize = event.rows;
    this.loadRequests();
  }

  onFilterChange(): void {
    this.currentPage = 1;
    this.loadRequests();
  }

  onTextFilterChange(): void {
    this.filterSubject.next();
  }

  clearAllFilters(): void {
    this.filters = {
      status: undefined,
      requestType: undefined,
      requester: undefined,
      approver: undefined
    };
    this.currentPage = 1;
    this.loadRequests();
  }

  viewRequest(requestId: string): void {
    this.router.navigate(['/requests', requestId]);
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

  getTypeSeverity(type: RequestType): string {
    switch (type) {
      case RequestType.DEPLOYMENT:
        return 'info';
      case RequestType.ACCESS:
        return 'warning';
      case RequestType.TECHNICAL_CHANGE:
        return 'success';
      case RequestType.INFRASTRUCTURE:
        return 'help';
      case RequestType.SECURITY:
        return 'danger';
      case RequestType.OTHER:
        return 'secondary';
      default:
        return 'info';
    }
  }

  canCreateRequests(): boolean {
    return this.authService.canCreateRequests();
  }
}
