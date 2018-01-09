import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[outsideClick]'
})
export class OutsideClickDirective {
    @Output()
    public outsideClick: EventEmitter<void> = new EventEmitter<void>();

    constructor(private _elementRef: ElementRef) {
    }

    @HostListener('document:click', ['$event.target'])
    public onClick(targetElement): void {
        this._onClick(targetElement);
    }
    @HostListener('document:touchstart', ['$event.target'])
    public onTouch(targetElement): void {
        this._onClick(targetElement);
    }

    private _onClick(targetElement): void {
        const clickedInside = this._elementRef.nativeElement.contains(targetElement);

        if (!clickedInside) {
            this.outsideClick.emit(null);
        }
    }
}
