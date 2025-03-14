import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import {DoublePlayAnimationComponent} from "../../shared/animations/double-play-animation/double-play-animation.component";
import {MoneyFlyAnimationComponent} from '../../shared/animations/money-fly-animation/money-fly-animation.component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TranslateModule } from '@ngx-translate/core';
import {
  HowToPlayAccordionComponent
} from '../../shared/components/how-to-play-accordion/how-to-play-accordion.component';
import {PrizesComponent} from '../../shared/components/prizes/prizes.component';
import {CashPrizeComponent} from '../../shared/components/cash-prize/cash-prize.component';
import {AnimateOnClickDirective} from '../../directives/animate-on-click.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    DoublePlayAnimationComponent,
    MoneyFlyAnimationComponent,
    TranslateModule,
    HowToPlayAccordionComponent,
    PrizesComponent,
    CashPrizeComponent,
    AnimateOnClickDirective
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

  // Method to restart jello animation
  restartJelloAnimation(elementId: string) {
    const element = document.getElementById(elementId);
    if (element) {
      // Remove and re-add the animation class to restart it
      element.classList.remove('jello-horizontal');
      // This tiny timeout is needed to ensure the class is properly removed before adding it back
      setTimeout(() => {
        element.classList.add('jello-horizontal');
      }, 10);
    }
  }
}
