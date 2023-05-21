import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdownToggle]'
})
export class DropdownToggleDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    const dropdownMenu = this.el.nativeElement.nextElementSibling;
    const isMenuOpen = dropdownMenu.classList.contains('show');

    if (isMenuOpen) {
      this.renderer.removeClass(dropdownMenu, 'show');
    } else {
      this.renderer.addClass(dropdownMenu, 'show');
    }
  }

  @HostListener('document:click', ['$event.target']) onDocumentClick(target: HTMLElement) {
    const dropdownMenu = this.el.nativeElement.nextElementSibling;
    const clickedInside = this.el.nativeElement.contains(target);

    if (!clickedInside && dropdownMenu.classList.contains('show')) {
      this.renderer.removeClass(dropdownMenu, 'show');
    }
  }
}
