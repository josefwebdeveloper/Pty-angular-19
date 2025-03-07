import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-money-fly-animation',
  standalone: true,
  imports: [],
  templateUrl: './money-fly-animation.component.html',
  styleUrl: './money-fly-animation.component.scss'
})
export class MoneyFlyAnimationComponent implements OnInit {
  // Animation will start automatically when component is initialized
  ngOnInit() {
    // Animation is controlled via CSS
  }
}
