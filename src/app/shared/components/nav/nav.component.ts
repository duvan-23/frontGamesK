import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html'
})
export class NavComponent {
  menuOpen = false;
  private router = inject(Router);
  authService = inject(AuthService);
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  closeMenu(){
    this.menuOpen = false;
  }

  preventReload(event: Event, targetUrl: string): void {
    if (this.router.url === targetUrl) {
      event.preventDefault(); // Prevent the default navigation
    }
  }

  logOut() {
    //Remove token
    this.authService.logOut();
    //Redirect to login
    this.router.navigate(['/login']);
  }
}
