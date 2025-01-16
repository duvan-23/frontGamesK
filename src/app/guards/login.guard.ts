import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  let authService = inject(AuthService);
  //Check if the token exist and is valid
  const isValidToken = authService.isValidToken();
  if (isValidToken) {
    //If the token is valid and they try to access the login by modifying the route, it redirects to home
    router.navigate(['/']);
  }
  return true;
};
