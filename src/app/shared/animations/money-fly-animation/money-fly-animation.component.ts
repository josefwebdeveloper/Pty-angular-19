import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-money-fly-animation',
  standalone: true,
  imports: [],
  templateUrl: './money-fly-animation.component.html',
  styleUrl: './money-fly-animation.component.scss'
})
export class MoneyFlyAnimationComponent implements OnInit, OnChanges {
  @Input() startAnimation = false;
  @Output() animationComplete = new EventEmitter<void>();
  
  isAnimating = false;

  ngOnInit() {
    // Check if we should auto-start the animation (backwards compatibility)
    if (this.startAnimation) {
      this.playAnimation();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Watch for changes to startAnimation input
    if (changes['startAnimation'] && changes['startAnimation'].currentValue && !this.isAnimating) {
      this.playAnimation();
    }
  }

  private playAnimation() {
    this.isAnimating = true;
    // Animation duration is controlled via CSS - 1.8s
    // Emit the animationComplete event after animation duration
    setTimeout(() => {
      this.animationComplete.emit();
    }, 2000); // 2000ms = 2s
  }
}
