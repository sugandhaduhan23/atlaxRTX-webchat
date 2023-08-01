import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoTextResize]',
})
export class AutoTextResizeDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener(':input')
  onInput() {
    this.resize();
  }

  resize() {
    this.elementRef.nativeElement.style.height = '0';
    this.elementRef.nativeElement.style.height =
      this.elementRef.nativeElement.scrollHeight + 'px';
  }
}
