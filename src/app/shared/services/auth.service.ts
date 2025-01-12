import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@enviroment';
import { Auth } from '@shared/models/auth';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiUrl = environment.API_URL;
  http= inject(HttpClient);
  token = signal<string>("");

  login(){
    return this.http.post<Auth>(`${this.apiUrl}auth/login`,{
      username: environment.USERLOGIN,
      password: environment.PASSWORDLOGIN
    }).pipe(
      tap((data) => {
        if(data.token){
          this.token.set(data.token);
        }
      })
    );
  }

}
