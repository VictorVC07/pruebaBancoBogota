import { Component, OnInit } from '@angular/core';
import { AuthService, User } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'approval-flow-front';
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Suscribirse a cambios en el usuario actual
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  canCreateRequests(): boolean {
    return this.authService.canCreateRequests();
  }
}