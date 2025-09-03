import { Component, OnInit } from '@angular/core';
import { AuthService, User, UserRole } from '../../services/auth.service';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss']
})
export class UserSelectorComponent implements OnInit {
  availableUsers: User[] = [];
  currentUser: User | null = null;
  isOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.availableUsers = this.authService.getAvailableUsers();
    this.currentUser = this.authService.getCurrentUser();
    
    // Suscribirse a cambios en el usuario actual
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  selectUser(user: User): void {
    this.authService.setCurrentUser(user);
    this.isOpen = false;
    window.location.reload();
  }


  toggleSelector(): void {
    this.isOpen = !this.isOpen;
  }

  getRoleBadgeClass(role?: UserRole): string {
    if (!role) return 'badge-default';
    return role === UserRole.APPROVER ? 'badge-approver' : 'badge-requester';
  }

  getRoleText(role?: UserRole): string {
    if (!role) return 'Sin rol';
    return role === UserRole.APPROVER ? 'Aprobador' : 'Solicitante';
  }
}