import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-slot-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slot-game.component.html',
  styleUrl: './slot-game.component.css'
})
export class SlotGameComponent {
  reels = [
    ['🍒', '🍋', '🍊', '🍉', '🍇'],
    ['🍒', '🍋', '🍊', '🍉', '🍇'],
    ['🍒', '🍋', '🍊', '🍉', '🍇']
  ];
  result: string = '';

  spin() {
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
      const reelElement = document.querySelector(`.reel:nth-child(${index + 1})`);

      // Check if reelElement is not null
      if (reelElement) {
        // Set the reel's HTML to the duplicated items
        reelElement.innerHTML = items.map(item => `<div class="box">${item}</div>`).join('');

        // Animate the reel
        tl.to(reelElement, {
          y: -spinDistance, // Move up by the height of all items
          duration: 1, // Duration of the spin
          ease: 'power2.inOut',
          onComplete: () => {
            // Randomize items after the spin
            this.reels[index] = this.getRandomItems();
            finalItems.push(this.reels[index][2]); // Get the third item (index 2) for the result
            gsap.set(reelElement, { y: 0 }); // Reset position
          }
        });
      }
    });

    // After the animation completes, set the result
    tl.eventCallback("onComplete", () => {
      this.result = finalItems.join(' | '); // Join the final items for display
    });
  }

  getRandomItems() {
    const items = ['🍒', '🍋', '🍊', '🍉', '🍇'];
    return Array.from({ length: 5 }, () => items[Math.floor(Math.random() * items.length)]);
  }
}
