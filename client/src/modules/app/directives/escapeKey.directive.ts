import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[escapeKey]'
})
export class EscapeKeyDirective {
    @Output() escapeKey = new EventEmitter<void>();

    @HostListener('document:keydown', ['$event'])
    private handleKeyPress(event: KeyboardEvent) {
        if (event.keyCode === 27) {
            this.escapeKey.emit();
        }
    }
}
