import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-prizes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prizes.component.html',
  styleUrl: './prizes.component.scss',
  animations: [
    trigger('fadeIn', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(30px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', animate('500ms ease-out'))
    ])
  ]
})
export class PrizesComponent implements OnInit {
  @ViewChild('prizesSection') prizesSection!: ElementRef;
  
  prizeItems = [
    {
      title: 'Collect to Win On-Box Prizes',
      icon: '/assets/car.svg',
      state: 'hidden',
      delay: 0
    },
    {
      title: 'Instant Win Prizes',
      icon: '/assets/Money-pr.svg',
      state: 'hidden',
      delay: 100
    },
    {
      title: 'Draw Prizes',
      icon: '/assets/draw.svg',
      state: 'hidden',
      delay: 200
    },
    {
      title: 'Instant Win App Prizes',
      icon: '/assets/prizes.svg',
      state: 'hidden',
      delay: 300
    }
  ];

  ngOnInit() {
    this.setupScrollObserver();
  }

  setupScrollObserver() {
    // Use Intersection Observer API to detect when prizes section is visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // When prizes section becomes visible, animate the items
          this.animatePrizeItems();
          // Unobserve after animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 }); // Trigger when 20% of the element is visible

    // Start observing when component is fully initialized
    setTimeout(() => {
      if (this.prizesSection?.nativeElement) {
        observer.observe(this.prizesSection.nativeElement);
      }
    }, 0);
  }

  animatePrizeItems() {
    // Animate each prize item with a staggered delay
    this.prizeItems.forEach((item, index) => {
      setTimeout(() => {
        item.state = 'visible';
      }, item.delay);
    });
  }
}
