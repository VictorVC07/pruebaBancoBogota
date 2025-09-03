import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { RequestType, RequestTypeOption } from '../Models/request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestTypeService {
  private readonly apiUrl = `${environment.apiUrl}/request-types`;

  constructor(private http: HttpClient) {}

  getRequestTypes(): Observable<RequestTypeOption[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(types => types.map(type => ({
        label: this.formatLabel(type.value || type.name || type),
        value: type.value || type.name || type
      }))),
      catchError(error => {
        console.error('Error fetching request types:', error);
        return of([]);
      })
    );
  }

  getRequestTypeByValue(value: string): Observable<RequestTypeOption | null> {
    return this.getRequestTypes().pipe(
      map(types => types.find(type => type.value === value) || null)
    );
  }

  private formatLabel(value: string): string {
    return value
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
}