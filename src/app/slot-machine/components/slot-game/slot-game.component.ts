import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SlotMachineService } from 'app/slot-machine/services/slot-machine.service';
import gsap from 'gsap';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyComponent } from '../currency/currency.component';
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-slot-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slot-game.component.html',
  styleUrl: './slot-game.component.css'
})
export class SlotGameComponent {

  reels: string[][]= [
    ['🍎','🍎','🍎','🍎','🍎','🍎','🍎','🍎'],
    ['🍎','🍎','🍎','🍎','🍎','🍎','🍎','🍎'],
    ['🍎','🍎','🍎','🍎','🍎','🍎','🍎','🍎']
  ];//Default reels
  result: string = '';
  showWin = false;
  coins = 0;
  slotService = inject(SlotMachineService);
  fruits: string[] = [];
  dialog = inject(MatDialog);

  ngOnInit(){
    //Get initial parameters
    this.slotService.getParametersGame().subscribe((data) => {
      this.reels = data.parameters.reels;
      this.fruits = data.parameters.fruits;
      this.coins = this.slotService.getCoins();
    });
  }
  
  //Spin
  spin(event: Event) {
    event.preventDefault();
    this.showWin = false;
    const tl = gsap.timeline();
    this.result = ''; // Reset result before spin

    // Store the final items to display in the result
    const finalItems: string[] = [];

    this.reels.forEach((reel, index) => {
      // Duplicate the items for a seamless loop effect
      const items = [...reel, ...reel, ...reel]; // Duplicate items
      const totalItems = items.length;
      const itemHeight = 40; // Height of each item
      const spinDistance = itemHeight * totalItems; // Total distance to spin

      // Select the reel element
      this.reels[index] = items;
      // Animate the reel
      tl.to(`.reel:nth-child(${index + 1})`, {
        y: -spinDistance, // Move up by the height of all items
        duration: 0.8, // Duration of the spin
        ease: 'power2.inOut',
        onComplete: () => {
          // Randomize items after the spin and reset position
          const newItems = this.getRandomItems();
          finalItems.push(newItems[1]); // Get the third item (index 2) for the result
          this.reels[index] = newItems; // Update the reel array
          gsap.set(`.reel:nth-child(${index + 1})`, { y: 0 }); // Reset position
        }
      });
    });

    // After the animation completes, set the result
    tl.eventCallback("onComplete", () => {
      this.showWin = true;
      let data = {
        result: finalItems,
        coins: this.coins
      };
      //Caulculate spin result
      this.slotService.setResult(data).subscribe((data) => {
        this.coins = this.slotService.getCoins();
        this.result = data.parameters.text;
        if(data.parameters.won){
          //Won, it shows an animation
          this.launchConfetti();
        }
      });
    });
  }

  //Set random items on the reels
  getRandomItems() {
    //Fruit types
    const items = this.fruits;
    return Array.from({ length: this.fruits.length }, () => items[Math.floor(Math.random() * items.length)]);
  }

  openDialogCurrency(event: Event) {
    event.preventDefault();
    //Currency exchange dialog
    this.dialog.open(CurrencyComponent, {
      width: '420px'
    });

  }

  launchConfetti() {
    //animation on winning
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

}
