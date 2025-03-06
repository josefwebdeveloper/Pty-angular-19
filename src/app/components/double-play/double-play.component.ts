import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import {NgStyle} from '@angular/common';
interface LogoState {
  kelloggStyle: any;
  diamondStyle: any;
  doubleStyle: any;
  playStyle: any;
}
@Component({
  selector: 'app-double-play',
  imports: [
    NgStyle
  ],
  templateUrl: './double-play.component.html',
  styleUrl: './double-play.component.scss',
  animations: [
    trigger('logoAnimation', [
      transition('* => *', [
        animate('500ms ease-in-out')
      ])
    ])
  ]
})
export class DoublePlayComponent {
  currentState = 0;
  isPlaying = false;
  animationSpeed = 2000;
  animationInterval: any;
  totalStates = 4;

  // Logo states definitions
  logoStates: LogoState[] = [
    { // State 1 - Words on sides
      kelloggStyle: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -120%)'
      },
      diamondStyle: {
        transform: 'translate(-50%, -50%) rotate(45deg)'
      },
      doubleStyle: {
        left: '25%',
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: 1
      },
      playStyle: {
        right: '25%',
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: 1
      }
    },
    { // State 2 - Words aligned more centrally
      kelloggStyle: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -120%)'
      },
      diamondStyle: {
        transform: 'translate(-50%, -50%) rotate(45deg)'
      },
      doubleStyle: {
        left: '30%',
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: 1
      },
      playStyle: {
        right: '30%',
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: 1
      }
    },
    { // State 3 - Diamond only with Kellogg's
      kelloggStyle: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -120%)'
      },
      diamondStyle: {
        transform: 'translate(-50%, -50%) rotate(45deg)'
      },
      doubleStyle: {
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: 0
      },
      playStyle: {
        right: '50%',
        top: '50%',
        transform: 'translate(50%, -50%)',
        opacity: 0
      }
    },
    { // State 4 - Complete logo, words centered over diamond
      kelloggStyle: {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -120%)'
      },
      diamondStyle: {
        transform: 'translate(-50%, -50%) rotate(45deg)'
      },
      doubleStyle: {
        left: '50%',
        top: '40%',
        transform: 'translateX(-50%)',
        opacity: 1
      },
      playStyle: {
        left: '50%',
        top: '60%',
        transform: 'translateX(-50%)',
        opacity: 1
      }
    }
  ];

  ngOnInit() {
    // No auto-start
  }

  ngOnDestroy() {
    this.stopAnimation();
  }

  getCurrentState(): LogoState {
    return this.logoStates[this.currentState];
  }

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.startAnimation();
    } else {
      this.stopAnimation();
    }
  }

  startAnimation() {
    this.animationInterval = setInterval(() => {
      this.goToNextState();
    }, this.animationSpeed);
  }

  stopAnimation() {
    if (this.animationInterval) {
      clearInterval(this.animationInterval);
    }
  }

  goToPreviousState() {
    this.currentState = (this.currentState - 1 + this.totalStates) % this.totalStates;
  }

  goToNextState() {
    this.currentState = (this.currentState + 1) % this.totalStates;
  }

  onSpeedChange(event: any) {
    this.animationSpeed = event.target.value;

    // Restart animation with new speed if playing
    if (this.isPlaying) {
      this.stopAnimation();
      this.startAnimation();
    }
  }
}
