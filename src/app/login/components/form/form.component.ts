import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatSelectModule],
  templateUrl: './form.component.html'
})
export class FormComponent {
  authService = inject(AuthService);
  router= inject(Router);
  fb = inject(FormBuilder);
  private _snackBar = inject(MatSnackBar);

  loginForm = this.fb.group({
    username: ['admin', [Validators.required, Validators.minLength(4)]],
    password: ['5678', [Validators.required, Validators.minLength(4)]],
  });
  passwordVisible = false; 

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }
  onSubmit(){
    let {username, password} = this.loginForm.value;
    if (username && password) {
      this.authService.login(username, password).subscribe({
        next: () => {
          this.router.navigate(['/']);
        }, error: () => {
          this._snackBar.open('Invalid credentials', "close", {duration: 2000, panelClass: ['alert-login']});
        }});
    }
  }
}
