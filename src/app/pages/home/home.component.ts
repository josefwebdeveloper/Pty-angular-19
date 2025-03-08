import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {DoublePlayAnimationComponent} from "../../shared/animations/double-play-animation/double-play-animation.component";
import {MoneyFlyAnimationComponent} from '../../shared/animations/money-fly-animation/money-fly-animation.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, DoublePlayAnimationComponent, MoneyFlyAnimationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  showMoneyFlyAnimation = false;

  onDoublePlayAnimationComplete() {
    this.showMoneyFlyAnimation = true;
  }
}
