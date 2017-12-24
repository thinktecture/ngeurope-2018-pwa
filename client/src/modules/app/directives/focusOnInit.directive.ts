import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
    selector: '[focusOnInit]'
})
export class FocusOnInitDirective implements OnInit {
    constructor(private _elementRef: ElementRef) {

    }

    public ngOnInit(): void {
        this._elementRef.nativeElement.focus();
    }
}
