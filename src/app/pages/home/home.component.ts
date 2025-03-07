import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DoublePlayAnimationComponent} from "../../shared/animations/double-play-animation/double-play-animation.component";
import {MoneyFlyAnimationComponent} from '../../shared/animations/money-fly-animation/money-fly-animation.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule, 
    CommonModule, 
    DoublePlayAnimationComponent, 
    MoneyFlyAnimationComponent,
    TranslateModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('slideIn', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('hidden => visible', animate('600ms ease-out'))
    ]),
    trigger('scaleUp', [
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.5)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('hidden => visible', animate('500ms ease-out'))
    ])
  ]
})
export class HomeComponent {
  user = {
    name: 'John',
    id: 123
  }
  showMoneyFlyAnimation = false;
  showMascot = false;
  showPrizeInfo = false;

  // Animation state variables
  mascotState = 'hidden';
  prizeInfoState = 'hidden';

  onDoublePlayAnimationComplete() {
    this.showMoneyFlyAnimation = true;
  }

  onMoneyFlyAnimationComplete() {
    // Show mascot with slide-in animation
    this.showMascot = true;
    this.mascotState = 'visible';

    // After mascot appears, show prize info with scale-up animation
    setTimeout(() => {
      this.showPrizeInfo = true;
      this.prizeInfoState = 'visible';
    }, 600);
  }
}
