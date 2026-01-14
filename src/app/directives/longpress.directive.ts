import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({ selector: '[longPress]' })

export class LongPressDirective {

  @Output()
  longPress = new EventEmitter();

  private _timeout: any;

  @HostListener('mousedown') onMouseDown( e: any ) {
    this._timeout = setTimeout(() => {
      this.longPress.emit( e );
    }, 500);
  }

  @HostListener('mouseup') onMouseUp() {
    clearTimeout(this._timeout);
  }

  @HostListener('mouseleave') onMouseLeave() {
    clearTimeout(this._timeout);
  }
}
