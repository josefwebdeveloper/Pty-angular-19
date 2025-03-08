import { Component } from '@angular/core';
import {MoneyFlyAnimationComponent} from '../../animations/money-fly-animation/money-fly-animation.component';

@Component({
  selector: 'app-cash-prize',
  imports: [
    MoneyFlyAnimationComponent
  ],
  templateUrl: './cash-prize.component.html',
  styleUrl: './cash-prize.component.scss'
})
export class CashPrizeComponent {

}
