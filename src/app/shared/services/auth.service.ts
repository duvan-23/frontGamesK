import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { environment } from '@enviroment';
import { Auth } from '@shared/models/auth';
import { tap } from 'rxjs';
import { setCookie, getCookie, removeCookie } from 'typescript-cookie';
import { isPlatformBrowser } from '@angular/common';
import { JwtPayload, jwtDecode} from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiUrl = environment.API_URL;
  http= inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  login(user:string, password:string){
    return this.http.post<Auth>(`${this.apiUrl}auth/login`,{
      username: user,
      password: password
    }).pipe(
      tap((data) => {
        if(data.token){
          this.saveToken(data.token);
        }
      })
    );
  }

  saveToken(token:string){
    if (isPlatformBrowser(this.platformId)) {
      setCookie('token', token, { expires: 1, path: '/', sameSite: 'Strict' });
    }
    
  }

  getToken():string | undefined{
    if (isPlatformBrowser(this.platformId)) {
      return getCookie('token');
    }
    return undefined;
  }

  logOut(){
    if (isPlatformBrowser(this.platformId)) {
      removeCookie('token');
      removeCookie('coins');
    }
  }

  isValidToken(){
    const token = this.getToken();
    if(!token){
      return false;
    }
    const decodeToken = jwtDecode<JwtPayload>(token);
    if( decodeToken && decodeToken?.exp){
      const tokenDate= new Date(0);
      tokenDate.setUTCSeconds(decodeToken.exp);
      const today = new Date();
      return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
  
}
