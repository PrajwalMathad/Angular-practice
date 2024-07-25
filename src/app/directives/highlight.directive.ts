import { Directive, ElementRef, HostListener, Input } from '@angular/core';
// Change the appearance or behavior of DOM elements and Angular components with attribute directives.
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() appHighlight!: string;
  constructor(private elref: ElementRef) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.highLight(this.appHighlight);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highLight('');
  }

  highLight = (color: string) => {
    this.elref.nativeElement.style.backgroundColor = color;
  }

}
