import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { environment } from '@enviroment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  
  //If token exists and the route is not in URL_EXCEPTION, set the bearer token
  if (token && !(environment.URL_EXCEPTION.some((url) => req.url.includes(url)))) {
    // Clone the request and add the Authorization header with the Bearer token
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
};
