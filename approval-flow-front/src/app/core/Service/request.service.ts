import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Request, CreateRequestDto, ApprovalActionDto } from '../Models/request.model';
import { AuthService } from '../../shared/services/auth.service';

export interface PagedResponse<T> {
  data: T[];
  totalRecords: number;
  totalPages: number;
  pageSize: number;
  currentPage: number;
}

export interface RequestFilters {
  status?: string;
  requestType?: string;
  requester?: string;
  approver?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private readonly apiUrl = `${environment.apiUrl}/requests`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getAllRequests(page: number = 1, pageSize: number = 10, filters: RequestFilters = {}): Observable<PagedResponse<Request>> {
    let params = new HttpParams();
    
    params = params.set('page', (page - 1).toString());
    params = params.set('size', pageSize.toString());
    
    if (filters.status) {
      params = params.set('status', filters.status.toLowerCase());
    }
    if (filters.requestType) {
      params = params.set('requestType', filters.requestType.toLowerCase());
    }
    if (filters.requester) {
      params = params.set('requester', filters.requester);
    }
    if (filters.approver) {
      params = params.set('approver', filters.approver);
    }
  
    return this.http.get<any>(this.apiUrl, { params })
      .pipe(
        map(response => ({
          data: response.content.map((item: any) => ({
            ...item,
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt)
          })),
          totalRecords: response.page.totalElements,
          totalPages: response.page.totalPages,
          pageSize: response.page.size,
          currentPage: response.page.number + 1
        })),
        catchError(this.handleError)
      );
  }

  getRequestById(id: string): Observable<Request> {
    return this.http.get<Request>(`${this.apiUrl}/${id}`)
      .pipe(
        map(request => ({
          ...request,
          createdAt: new Date(request.createdAt),
          updatedAt: new Date(request.updatedAt)
        })),
        catchError(this.handleError)
      );
  }

  createRequest(request: CreateRequestDto): Observable<Request> {
    return this.http.post<Request>(this.apiUrl, request)
      .pipe(
        map(response => ({
          ...response,
          createdAt: new Date(response.createdAt),
          updatedAt: new Date(response.updatedAt)
        })),
        catchError(this.handleError)
      );
  }

  approveRequest(id: string, approvalData: ApprovalActionDto): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/${id}/approve`, approvalData)
      .pipe(
        map(response => ({
          ...response,
          createdAt: new Date(response.createdAt),
          updatedAt: new Date(response.updatedAt)
        })),
        catchError(this.handleError)
      );
  }

  rejectRequest(id: string, rejectionData: ApprovalActionDto): Observable<Request> {
    return this.http.put<Request>(`${this.apiUrl}/${id}/reject`, rejectionData)
      .pipe(
        map(response => ({
          ...response,
          createdAt: new Date(response.createdAt),
          updatedAt: new Date(response.updatedAt)
        })),
        catchError(this.handleError)
      );
  }

  getPendingRequestsCount(): Observable<number> {
    const currentUserEmail = this.authService.getCurrentUserEmail();
    
    if (!currentUserEmail) {
      return throwError(() => new Error('No hay usuario autenticado'));
    }

    return this.http.get<{count: number}>(`${environment.apiUrl}/requests/pending-count/${currentUserEmail}`)
      .pipe(
        map(response => response.count),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      if (error.error?.message) {
        errorMessage = error.error.message;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}