import { ElementRef } from '@angular/core';
import { HostListener } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appNotEmpty]'
})
export class NotEmptyDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event'])
  onInputChange(event: Event): void {
    const input = this.el.nativeElement as HTMLInputElement;
    if (input.value.trim()) {
      input.classList.add('not-empty');
    } else {
      input.classList.remove('not-empty');
    }
  }
}
