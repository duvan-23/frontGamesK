import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IPropertiesGame } from 'app/home/models/game';
import { DetailGameComponent } from '../detail-game/detail-game.component';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './game.component.html'
})
export class GameComponent {
  @Input ({required: true}) game!: IPropertiesGame;
  dialog = inject(MatDialog);

  seeDetails(event: Event) {
    event.preventDefault();
    this.dialog.open(DetailGameComponent, {
      width: '320px',
      data: { ...this.game }, 
    });

  }
}
