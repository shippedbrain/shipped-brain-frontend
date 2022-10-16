import { Component, Input, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-fixed-widget-badge',
    templateUrl: './fixed-widget-badge.component.html',
    styleUrls: ['./fixed-widget-badge.component.scss'],
})
export class FixedWidgetBadgeComponent {
    @Input() modalID: string = '';
    @Input() icon: string = '';
    @Input() title: string = '';
    @Input() markdownSectionID: string = '';
    @Input() modalTitle: string = '';
    @Input() markdownClass: string = '';

    constructor(private renderer: Renderer2) {}

    /**
     * Opens modal and adds modal class to body
     */
    openModal(): void {
        if (this.modalID) {
            const modal = document.getElementById(this.modalID);
            modal.classList.add('show');

            this.renderer.addClass(document.body, 'is-modal');
        }
    }
}
