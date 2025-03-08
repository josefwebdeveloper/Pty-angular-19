import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy, NgZone } from '@angular/core';
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
  private moneyAnimationTriggered = false;
  private tigerAnimationComplete = false;

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    // Delay the setup slightly to ensure DOM is fully rendered
    setTimeout(() => {
      this.setupScrollObservers();
    }, 100);
  }

  ngOnDestroy() {
    // Clean up observers to prevent memory leaks
    this.observers.forEach(observer => observer.disconnect());
  }

  private setupScrollObservers() {
    const generalOptions = {
      root: null, // Use viewport as root
      rootMargin: '0px',
      threshold: 0.2 // Trigger when 20% of the element is visible
    };

    // Money animation needs a more specific configuration
    const moneyOptions = {
      root: null,
      rootMargin: '-100px 0px', // Only trigger when fully in viewport with some margin
      threshold: 0.5 // Require more visibility before triggering
    };
    
    // Observer for tiger image - triggers first
    const tigerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Listen for animation end on tiger
          const tigerElement = entry.target as HTMLElement;
          this.listenForTigerAnimationEnd(tigerElement);
          // Disconnect after animation is triggered
          tigerObserver.unobserve(entry.target);
        }
      });
    }, generalOptions);
    
    // Observer for money animation - with special handling
    const moneyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Only trigger if intersecting AND not already triggered
        if (entry.isIntersecting && !this.moneyAnimationTriggered) {
          this.ngZone.run(() => {
            this.moneyAnimationTriggered = true;
            entry.target.classList.add('animate-in');
            // Force a reflow to ensure animation restarts
            void (entry.target as HTMLElement).offsetWidth;
          });
          // Keep observing to allow re-triggering on scroll if needed
        }
      });
    }, moneyOptions);

    // Start observing elements (don't observe cash prize yet - it will be triggered after tiger)
    tigerObserver.observe(this.tigerImage.nativeElement);
    moneyObserver.observe(this.moneyAnimation.nativeElement);
    
    // Store observers for cleanup
    this.observers.push(tigerObserver, moneyObserver);
  }

  private listenForTigerAnimationEnd(tigerElement: HTMLElement) {
    // Calculate animation duration from CSS - tiger animation takes 0.6s according to CSS
    const tigerAnimationDuration = 600; // 600ms = 0.6s
    
    // When tiger animation ends, trigger cash prize animation
    setTimeout(() => {
      this.ngZone.run(() => {
        this.tigerAnimationComplete = true;
        // Now trigger the cash prize animation
        if (this.cashPrizeImage && this.cashPrizeImage.nativeElement) {
          this.cashPrizeImage.nativeElement.classList.add('animate-in');
        }
      });
    }, tigerAnimationDuration);
  }
}
