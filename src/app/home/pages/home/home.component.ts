import { Component } from '@angular/core';
import { GameListComponent } from 'app/home/components/game-list/game-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GameListComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
