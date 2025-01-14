import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { SlotMachineService } from 'app/slot-machine/services/slot-machine.service';
import gsap from 'gsap';

@Component({
  selector: 'app-slot-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slot-game.component.html',
  styleUrl: './slot-game.component.css'
})
export class SlotGameComponent {

  reels: string[][]= [];
  result: string = '';
  showWin = false;
  coins = 0;
  slotService = inject(SlotMachineService);
  fruits: string[] = [];
  ngOnInit(){
    this.slotService.getParametersGame().subscribe((data) => {
      this.reels = data.reels;
      this.fruits = data.fruits;
      this.coins = this.slotService.getCoins();
    });
  }
  
  spin() {
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
      this.slotService.setResult(data).subscribe((data) => {
        this.coins = this.slotService.getCoins();
        this.result = data.text;
      });
    });
  }

  getRandomItems() {
    const items = this.fruits;
    return Array.from({ length: this.fruits.length }, () => items[Math.floor(Math.random() * items.length)]);
  }
}
