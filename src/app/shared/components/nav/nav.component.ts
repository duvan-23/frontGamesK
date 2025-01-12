import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html'
})
export class NavComponent {
  menuOpen = false;
  private router = inject(Router);

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  

  preventReload(event: Event, targetUrl: string): void {
    if (this.router.url === targetUrl) {
      event.preventDefault(); // Prevent the default navigation
    }
  }
}
