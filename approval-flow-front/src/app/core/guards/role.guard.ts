import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService, UserRole } from '../../shared/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRoles = route.data['roles'] as UserRole[];
    const currentUserRole = this.authService.getCurrentUserRole();
    
    // Si no hay roles requeridos, permitir acceso
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }
    
    // Verificar si el usuario tiene uno de los roles requeridos
    if (currentUserRole && requiredRoles.includes(currentUserRole)) {
      return true;
    }
    
    // Redirigir a la lista de solicitudes si no tiene permisos
    this.router.navigate(['/requests']);
    return false;
  }
}