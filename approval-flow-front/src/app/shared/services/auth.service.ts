import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum UserRole {
  APPROVER = 'APPROVER',
  REQUESTER = 'REQUESTER'
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly USER_KEY = 'current_user';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private readonly MOCK_USERS: User[] = [
    {
      id: '1',
      email: 'aprobador@bancobogota.com',
      name: 'María García - Aprobador',
      role: UserRole.APPROVER,
      department: 'Gestión'
    },
    {
      id: '2',
      email: 'juanperez@bancobogota.com',
      name: 'Juan Pérez - Solicitante',
      role: UserRole.REQUESTER,
      department: 'Desarrollador'
    },
    {
      id: '3',
      email: 'anahernandez@bancobogota.com',
      name: 'Ana Hernández - Solicitante',
      role: UserRole.REQUESTER,
      department: 'Desarrollador'
    },
  ];

  constructor() {
    this.initializeMockSession();
  }

  private initializeMockSession(): void {
    const existingUser = this.getCurrentUser();
    if (!existingUser) {
      const defaultUser = this.MOCK_USERS.find(user => user.role === UserRole.APPROVER);
      if (defaultUser) {
        this.setCurrentUser(defaultUser);
      }
    } else {
      this.currentUserSubject.next(existingUser);
    }
  }

  getAvailableUsers(): User[] {
    return this.MOCK_USERS;
  }

  getCurrentUser(): User | null {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  setCurrentUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  switchUser(userId: string): boolean {
    const user = this.MOCK_USERS.find(u => u.id === userId);
    if (user) {
      this.setCurrentUser(user);
      return true;
    }
    return false;
  }

  getCurrentUserEmail(): string {
    const user = this.getCurrentUser();
    return user ? user.email : '';
  }

  getCurrentUserRole(): UserRole | null {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  isApprover(): boolean {
    return this.getCurrentUserRole() === UserRole.APPROVER;
  }

  isRequester(): boolean {
    return this.getCurrentUserRole() === UserRole.REQUESTER;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  canApproveRequests(): boolean {
    return this.isApprover();
  }

  canCreateRequests(): boolean {
    return this.isRequester();
  }

  logout(): void {
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
  }
}