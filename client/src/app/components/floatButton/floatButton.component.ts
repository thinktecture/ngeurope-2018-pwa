import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
    selector: 'float-button',
    templateUrl: 'floatButton.component.html',
})
export class FloatButtonComponent {
    @Input() icon: string;
    @Input() disabled: boolean;
    @Output() clicked = new EventEmitter<void>();

    public click(): void {
        this.clicked.emit();
    }
}
