import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHoverColor]'
})
export class HoverColorDirective {
  @Input('appHoverColor') color!: string
  @Input('bgColor') bgColor!: string

  @HostListener('mouseenter') onEnter() {
    this.r.setStyle(this.elementRef.nativeElement, 'color', this.color)
    this.r.setStyle(this.elementRef.nativeElement, 'background-color', this.bgColor)
  }

  @HostListener('mouseleave') onLeave() {
    this.r.setStyle(this.elementRef.nativeElement, 'color', this.bgColor)
    this.r.setStyle(this.elementRef.nativeElement, 'background-color', this.color)
  }

  constructor(
    private readonly elementRef: ElementRef,
    private r: Renderer2
  ) {
  }

}
