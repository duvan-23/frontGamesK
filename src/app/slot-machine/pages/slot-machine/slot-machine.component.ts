import { Component } from '@angular/core';
import { SlotGameComponent } from 'app/slot-machine/components/slot-game/slot-game.component';

@Component({
  selector: 'app-slot-machine',
  standalone: true,
  imports: [SlotGameComponent],
  templateUrl: './slot-machine.component.html'
})
export class SlotMachineComponent {

}
