import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let authService = inject(AuthService);
  //Check if the token exist and is valid
  const isValidToken = authService.isValidToken();
  if (!isValidToken) {
    //If the token is not valid redirect to login
    router.navigate(['/login']);
    return false;
  }
  return true;
};
