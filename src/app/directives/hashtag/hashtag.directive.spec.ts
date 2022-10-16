import { ElementRef } from '@angular/core';
import { HashtagDirective } from './hashtag.directive';

describe('HashtagDirective', () => {
    it('should create an instance', () => {
        const elementRef = new ElementRef({});
        const directive = new HashtagDirective(elementRef);
        expect(directive).toBeTruthy();
    });
});
