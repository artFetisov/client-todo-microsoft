import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appAutofocus]'
})
export class AutofocusDirective implements AfterViewInit {
  @Input()
  public set appAutofocus(shouldFocus: boolean) {
    this.shouldFocus = shouldFocus;
    this.checkFocus();
  }

  private shouldFocus = false

  constructor(
    private readonly elementRef: ElementRef
  ) {
  }

  ngAfterViewInit() {
    this.checkFocus()
  }

  checkFocus() {
    if (!this.shouldFocus) {
      return
    }

    const hostElement = (<HTMLElement>this.elementRef.nativeElement)

    if (!hostElement) {
      return
    }

    hostElement.focus()
  }
}
