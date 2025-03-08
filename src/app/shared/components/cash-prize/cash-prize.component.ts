import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
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

  ngAfterViewInit() {
    this.setupScrollObservers();
  }

  ngOnDestroy() {
    // Clean up observers to prevent memory leaks
    this.observers.forEach(observer => observer.disconnect());
  }

  private setupScrollObservers() {
    const options = {
      root: null, // Use viewport as root
      rootMargin: '0px',
      threshold: 0.2 // Trigger when 20% of the element is visible
    };

    // Observer for cash prize image
    const cashPrizeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Disconnect after animation is triggered
          cashPrizeObserver.unobserve(entry.target);
        }
      });
    }, options);
    
    // Observer for tiger image
    const tigerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Disconnect after animation is triggered
          tigerObserver.unobserve(entry.target);
        }
      });
    }, options);
    
    // Observer for money animation
    const moneyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Disconnect after animation is triggered
          moneyObserver.unobserve(entry.target);
        }
      });
    }, options);

    // Start observing elements
    cashPrizeObserver.observe(this.cashPrizeImage.nativeElement);
    tigerObserver.observe(this.tigerImage.nativeElement);
    moneyObserver.observe(this.moneyAnimation.nativeElement);
    
    // Store observers for cleanup
    this.observers.push(cashPrizeObserver, tigerObserver, moneyObserver);
  }
}
