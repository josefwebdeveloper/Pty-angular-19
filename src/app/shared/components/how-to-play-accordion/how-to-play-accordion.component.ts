import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-how-to-play-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-to-play-accordion.component.html',
  styleUrl: './how-to-play-accordion.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: 0,
        overflow: 'hidden'
      })),
      state('expanded', style({
        height: '*',
        opacity: 1
      })),
      transition('collapsed <=> expanded', [
        animate('500ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ]),
    trigger('rotateArrow', [
      state('collapsed', style({
        transform: 'rotate(0deg)'
      })),
      state('expanded', style({
        transform: 'rotate(180deg)'
      })),
      transition('collapsed <=> expanded', [
        animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ])
    ]),
    trigger('fadeInSteps', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('300ms 100ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    // Bee animation that slides up from bottom
    trigger('beeSlideIn', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(50px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', [
        animate('600ms ease-out')
      ]),
      transition('visible => hidden', [
        animate('300ms ease-in')
      ])
    ])
  ]
})
export class HowToPlayAccordionComponent {
  // Accordion state
  isExpanded: boolean = false;
  
  // Test bee animation state (for the test area)
  beeState: string = 'hidden';
  
  // Accordion bee animation state (for the bee inside the accordion)
  accordionBeeState: string = 'hidden';
  
  toggleAccordion(): void {
    this.isExpanded = !this.isExpanded;
    
    // When expanding the accordion, add a delay before showing the bee
    if (this.isExpanded) {
      // First reset the bee state to hidden
      this.accordionBeeState = 'hidden';
      
      // Then after a delay, make it visible to trigger the animation
      setTimeout(() => {
        this.accordionBeeState = 'visible';
      }, 600); // Delay matches the accordion open animation duration
    } else {
      // When closing, hide the bee immediately
      this.accordionBeeState = 'hidden';
    }
    
    console.log('Accordion state changed:', this.isExpanded ? 'expanded' : 'collapsed');
  }
  
  // Function to toggle bee animation independently (only for the test area)
  toggleBeeAnimation(): void {
    this.beeState = this.beeState === 'hidden' ? 'visible' : 'hidden';
    console.log('Bee animation state:', this.beeState);
  }
}
