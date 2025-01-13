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
      // Animate the entire reel
      tl.to(`.reel:nth-child(${index + 1})`, {
        y: -200, // Move up
        duration: 0.5, // Faster movement
        ease: 'power2.inOut',
        onComplete: () => {
          // Randomize items and get the third item for the result
          this.reels[index] = this.getRandomItems();
          finalItems.push(this.reels[index][2]); // Get the third item (index 2) for the result
          gsap.set(`.reel:nth-child(${index + 1})`, { y: 0 }); // Reset position
        }
      });
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
