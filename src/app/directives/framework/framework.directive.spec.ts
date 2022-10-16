import { ElementRef } from '@angular/core';
import { FrameworkDirective } from './framework.directive';

describe('FrameworkDirective', () => {
    it('should create an instance', () => {
        const elementRef = new ElementRef({});
        const directive = new FrameworkDirective(elementRef);
        expect(directive).toBeTruthy();
    });
});
