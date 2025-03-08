import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-double-play-animation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule
  ],
  templateUrl: './double-play-animation.component.html',
  styleUrl: './double-play-animation.component.scss',
  animations: [
    trigger('kelloggsAnimation', [
      state('initial', style({
        top: '-29%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0
      })),

      state('final', style({
        top: '25%',
        left: '50%',
        transform: 'translate(-50%, -50%) scale(0.5)',
        opacity: 1
      })),
      transition('* => *', animate('0.7s ease-in-out'))
    ]),
    trigger('diamondAnimation', [
      state('initial', style({
        transform: 'translate(-50%, -50%) scale(0.2)',
        opacity: 0
      })),

      state('final', style({
        transform: 'translate(-50%, -50%) scale(1)',
        opacity: 1
      })),
      transition('* => *', animate('0.7s ease-in-out'))
    ]),
    trigger('doubleTextAnimation', [
      state('initial', style({
        top: '44%',
        left: '-69%',
        transform: 'translate(-50%, -50%)',
        opacity: 0
      })),

      state('final', style({
        top: '44%',
        left: '49%',
        transform: 'translate(-50%, -50%)',
        opacity: 1
      })),
      transition('* => *', animate('0.7s ease-in-out'))
    ]),
    trigger('playTextAnimation', [
      state('initial', style({
        top: '62%',
        left: '190%',
        transform: 'translate(-50%, -50%)',
        opacity: 0
      })),

      state('final', style({
        top: '62%',
        left: '49%',
        transform: 'translate(-50%, -50%)',
        opacity: 1
      })),
      transition('* => *', animate('0.7s ease-in-out'))
    ])
  ]
})
export class DoublePlayAnimationComponent implements OnInit, OnDestroy {
  animationState: 'initial' | 'step1' | 'step2' | 'step3' | 'final' = 'initial';
  isPlaying = false;
  animationSpeed = 1.0;
  private animationInterval: any;
  private animationSequence: ('initial' |  'final')[] = [
    'initial',  'final'
  ];
  private currentStep = 0;
  @Output() animationComplete = new EventEmitter<void>();

  ngOnInit(): void {
      this.playAnimation();
  }

  ngOnDestroy(): void {
    this.stopAnimation();
  }

  playAnimation(): void {
    if (this.isPlaying) {
      this.stopAnimation();
      return;
    }

    this.isPlaying = true;
    const interval = 1000 / this.animationSpeed;

    if (this.animationState === 'final') {
      this.resetAnimation();
    }

    this.animationInterval = setInterval(() => {
      this.currentStep++;
      if (this.currentStep >= this.animationSequence.length) {
        this.stopAnimation();
        return;
      }

      this.animationState = this.animationSequence[this.currentStep];
    }, interval);
  }

  stopAnimation(): void {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
      this.animationInterval = null;
    }
    this.isPlaying = false;

    // Emit the event when animation completes
    if (this.animationState === 'final') {
      this.animationComplete.emit();

    }
  }

  resetAnimation(): void {
    this.stopAnimation();
    this.currentStep = 0;
    this.animationState = 'initial';
  }
}
