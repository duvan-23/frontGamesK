import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  authService = inject(AuthService);
  router= inject(Router);

  ngOnInit() {
  }

  login(){
    this.authService.login().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
