import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-money-fly-animation',
  standalone: true,
  imports: [],
  templateUrl: './money-fly-animation.component.html',
  styleUrl: './money-fly-animation.component.scss'
})
export class MoneyFlyAnimationComponent implements OnInit {
  @Output() animationComplete = new EventEmitter<void>();
  
  // Animation will start automatically when component is initialized
  ngOnInit() {
    // Animation is controlled via CSS
    // Emit the animationComplete event after animation duration
    // The animation takes about 1.8s to complete, adding a bit more to ensure all elements are done
    setTimeout(() => {
      this.animationComplete.emit();
    }, 2000); // 2000ms = 2s
  }
}
