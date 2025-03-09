import { Directive, ElementRef, Renderer2, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appAnimateOnClick]',
  standalone: true
})
export class AnimateOnClickDirective {
  @Input('appAnimateOnClick') animationClass: string = 'jello-horizontal';
  @Input() animationDuration: number = 1500;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click')
  onClick(): void {
    this.renderer.removeClass(this.el.nativeElement, this.animationClass);
    void this.el.nativeElement.offsetWidth;
    this.renderer.addClass(this.el.nativeElement, this.animationClass);
    setTimeout(() => {
      this.renderer.removeClass(this.el.nativeElement, this.animationClass);
    }, this.animationDuration);
  }
}
