import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { IGame } from 'app/home/models/game';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [RouterLinkWithHref, CommonModule],
  templateUrl: './game.component.html'
})
export class GameComponent {
  @Input ({required: true}) game!: IGame;

  seeDetails() {

  }
}
