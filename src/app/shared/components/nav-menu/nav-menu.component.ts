import { Component, OnInit, OnDestroy, HostBinding, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-menu',
  standalone: true,
  imports: [RouterModule, TranslateModule],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss'
})
export class NavMenuComponent implements OnInit, OnDestroy {
  @HostBinding('class.visible') isVisible = true;
  
  private autoHideTimer: any;
  private destroy$ = new Subject<void>();
  private readonly autoHideDelay = 3000; // 3 seconds
  private isBrowser: boolean;
  private isAtBottom = false;

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
        this.checkScrollPosition();
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

  private checkScrollPosition(): void {
    // Calculate if we're at the bottom of the page (with a small buffer)
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    
    // Consider we're at the bottom if we're within 100px of the bottom
    this.isAtBottom = (scrollPosition + windowHeight) >= (documentHeight - 100);
  }

  private showNavigation(): void {
    // Always make navigation visible
    this.isVisible = true;
    
    // Reset the auto-hide timer
    this.clearAutoHideTimer();
    
    // Only set auto-hide timer if we're NOT at the bottom of the page
    if (!this.isAtBottom) {
      this.autoHideTimer = setTimeout(() => {
        this.isVisible = false;
      }, this.autoHideDelay);
    }
  }

  private clearAutoHideTimer(): void {
    if (this.autoHideTimer) {
      clearTimeout(this.autoHideTimer);
      this.autoHideTimer = null;
    }
  }
}
