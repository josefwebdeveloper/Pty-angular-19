import { Component } from '@angular/core';


@Component({
  selector: 'app-prize',
  standalone: true,
  imports: [],
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
