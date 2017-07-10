import { Directive,HostListener,HostBinding } from '@angular/core';

@Directive({
  selector: '[rbDropdown]'
})
export class DropdownDirective {

  constructor() { }
  private isOpen = false;

  @HostListener('mouseenter') open(){
  	this.isOpen = true;
  }

  @HostListener('mouseleave') close(){
  	this.isOpen = false;
  }

  @HostBinding('class.open') get opened(){
  	return this.isOpen;
  }

}
