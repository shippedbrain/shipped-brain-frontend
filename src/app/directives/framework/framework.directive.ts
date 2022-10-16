import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import {
    EMPTY,
    Framework,
    NONE,
    NULL,
    PYTORCH,
    TENSORFLOW,
} from 'src/app/models/framework/framework';

@Directive({
    selector: '[framework]',
})
export class FrameworkDirective implements OnInit {
    @Input() frameworkTitle: Framework;
    baseAlertClasses: string = 'alert alert-xs';

    constructor(private elementRef: ElementRef) {}

    ngOnInit() {
        this.validateFramework();
    }

    /**
     * Checks framework title and applies respective alert class.
     * If framework is empty or 'none', nothing is shown
     */
    validateFramework(): void {
        switch (this.frameworkTitle) {
            case PYTORCH:
                this.elementRef.nativeElement.classList.add(
                    'alert',
                    'alert-pytorch',
                    'alert-xs',
                    'font-bold'
                );
                break;

            case TENSORFLOW:
                this.elementRef.nativeElement.classList.add(
                    'alert',
                    'alert-tensorflow',
                    'alert-xs',
                    'font-bold'
                );
                break;

            case NONE:
            case EMPTY:
            case NULL:
                this.elementRef.nativeElement.innerHTML = '';
                break;

            default:
                this.elementRef.nativeElement.classList.add(
                    'alert',
                    'alert-magenta',
                    'alert-xs',
                    'font-bold'
                );
                break;
        }
    }
}
