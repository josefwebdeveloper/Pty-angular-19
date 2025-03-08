import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-to-play-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './how-to-play-accordion.component.html',
  styleUrl: './how-to-play-accordion.component.scss'
})
export class HowToPlayAccordionComponent {
  isExpanded: boolean = false;
  
  toggleAccordion(): void {
    this.isExpanded = !this.isExpanded;
  }
}
