import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: '[hashtag]',
})
export class HashtagDirective implements OnInit {
    @Input() hashtagKey: string;
    @Input() hashtagValue: string;

    constructor(private elementRef: ElementRef) {}

    ngOnInit(): void {
        this.checkIfIsHashtag();
    }

    /**
     * Validates if hashtag key is equal to 'hashtag' to pre-append # to text
     */
    checkIfIsHashtag(): void {
        if (this.hashtagKey === 'hashtag') {
            this.elementRef.nativeElement.innerHTML = `#${this.hashtagValue}`;
        }
    }
}
