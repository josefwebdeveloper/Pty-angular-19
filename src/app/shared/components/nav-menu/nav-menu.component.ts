import { Component, OnInit, OnDestroy, HostBinding, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent implements OnInit, OnDestroy {
  @HostBinding('class.visible') isVisible = true;
  
  private autoHideTimer: any;
  private destroy$ = new Subject<void>();
  private readonly autoHideDelay = 3000; // 3 seconds
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return; // Skip for server-side rendering
    
    // Show navigation initially
    this.showNavigation();
    
    // Set up scroll event listener
    fromEvent(window, 'scroll')
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(100) // Debounce scroll events
      )
      .subscribe(() => {
        this.showNavigation();
      });

    // Also reshow navigation on any touch/mouse events
    fromEvent(document, 'touchstart')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.showNavigation());

    fromEvent(document, 'mousedown')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.showNavigation());
  }

  ngOnDestroy(): void {
    // Clear any timers and unsubscribe from observables
    this.clearAutoHideTimer();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private showNavigation(): void {
    // Make navigation visible
    this.isVisible = true;
    
    // Reset the auto-hide timer
    this.clearAutoHideTimer();
    
    // Set a new timer to hide the navigation after the delay
    this.autoHideTimer = setTimeout(() => {
      this.isVisible = false;
    }, this.autoHideDelay);
  }

  private clearAutoHideTimer(): void {
    if (this.autoHideTimer) {
      clearTimeout(this.autoHideTimer);
      this.autoHideTimer = null;
    }
  }
}
