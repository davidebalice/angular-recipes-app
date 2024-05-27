import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropDownDirective {
  private isOpen = false;

  constructor(private elRef: ElementRef) {}

  @HostListener('click', ['$event']) toggleOpen(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    this.setDropdownState();
  }

  @HostListener('document:click', ['$event']) closeDropdown(event: Event) {
    if (!this.elRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
      this.setDropdownState();
    }
  }

  private setDropdownState() {
    const dropdownMenu = this.elRef.nativeElement.querySelector('.dropdown-menu');
    if (this.isOpen) {
      dropdownMenu.style.display = 'block';
    } else {
      dropdownMenu.style.display = 'none';
    }
  }
}
