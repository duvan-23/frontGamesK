import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let authService = inject(AuthService);
  const isValidToken = authService.isValidToken();
  if (isValidToken) {
    router.navigate(['/']);
  }
  return true;
};
