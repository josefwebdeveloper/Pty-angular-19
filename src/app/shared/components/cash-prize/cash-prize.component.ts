import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy, NgZone, signal } from '@angular/core';
import { MoneyFlyAnimationComponent } from '../../animations/money-fly-animation/money-fly-animation.component';

@Component({
  selector: 'app-cash-prize',
  standalone: true,
  imports: [
    MoneyFlyAnimationComponent
  ],
  templateUrl: './cash-prize.component.html',
  styleUrl: './cash-prize.component.scss'
})
export class CashPrizeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('cashPrizeImage') cashPrizeImage!: ElementRef;
  @ViewChild('tigerImage') tigerImage!: ElementRef;
  @ViewChild('moneyAnimation') moneyAnimation!: ElementRef;

  private observers: IntersectionObserver[] = [];

  moneyAnimationTriggered = signal(false);
  tigerAnimationComplete = signal(false);

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.setupScrollObservers();
    }, 100);
  }

  ngOnDestroy() {
    this.observers.forEach(observer => observer.disconnect());
  }

  private setupScrollObservers() {
    const animationOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.8
    };

    const tigerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          const tigerElement = entry.target as HTMLElement;
          this.listenForTigerAnimationEnd(tigerElement);
          tigerObserver.unobserve(entry.target);
        }
      });
    }, animationOptions);

    const moneyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.moneyAnimationTriggered()) {
          this.ngZone.run(() => {
            this.moneyAnimationTriggered.set(true);
            entry.target.classList.add('animate-in');
            moneyObserver.unobserve(entry.target);
          });
        }
      });
    }, animationOptions);

    tigerObserver.observe(this.tigerImage.nativeElement);
    moneyObserver.observe(this.moneyAnimation.nativeElement);

    this.observers.push(tigerObserver, moneyObserver);
  }

  private listenForTigerAnimationEnd(tigerElement: HTMLElement) {
    const tigerAnimationDuration = 600;

    setTimeout(() => {
      this.ngZone.run(() => {
        this.tigerAnimationComplete.set(true);
        if (this.cashPrizeImage && this.cashPrizeImage.nativeElement) {
          this.cashPrizeImage.nativeElement.classList.add('animate-in');
        }
      });
    }, tigerAnimationDuration);
  }
}
