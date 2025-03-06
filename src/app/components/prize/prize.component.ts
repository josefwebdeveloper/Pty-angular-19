import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prize',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prize.component.html',
  styleUrl: './prize.component.scss'
})
export class PrizeComponent {
  // This will later be replaced with actual user information
  userName = '<Name>';
  
  claimPrize() {
    console.log('Prize claimed!');
    // This will be implemented in a future version
  }
}
