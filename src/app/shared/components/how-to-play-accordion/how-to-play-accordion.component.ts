import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-how-to-play-accordion',
  standalone: true,
  imports: [CommonModule, TranslateModule],
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
  isExpanded: boolean = true;

  beeState: string = 'hidden';

  accordionBeeState: string = 'visible';

  toggleAccordion(): void {
    this.isExpanded = !this.isExpanded;

    if (this.isExpanded) {
      this.accordionBeeState = 'hidden';

      setTimeout(() => {
        this.accordionBeeState = 'visible';
      }, 600);
    } else {
      this.accordionBeeState = 'hidden';
    }

    console.log('Accordion state changed:', this.isExpanded ? 'expanded' : 'collapsed');
  }

  toggleBeeAnimation(): void {
    this.beeState = this.beeState === 'hidden' ? 'visible' : 'hidden';
    console.log('Bee animation state:', this.beeState);
  }
}
