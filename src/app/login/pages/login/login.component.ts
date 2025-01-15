import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormComponent } from 'app/login/components/form/form.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {

}
