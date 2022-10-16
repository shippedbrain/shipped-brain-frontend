import { Component, Input, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-markdown-info-modal',
    templateUrl: './markdown-info-modal.component.html',
    styleUrls: ['./markdown-info-modal.component.scss'],
})
export class MarkdownInfoModalComponent {
    @Input() markdownSectionID: string = '';
    @Input() modalTitle: string = '';
    @Input() markdownClass: string = '';
    modalID: string = 'modalMarkdownInfo';
    fullMarkdownVisible: boolean = false;

    constructor(private renderer: Renderer2) {}

    /**
     * Closes modal and removes modal class from body
     */
    closeModal(): void {
        const modal = document.getElementById(this.modalID);
        modal.classList.remove('show');

        this.renderer.removeClass(document.body, 'is-modal');
    }

    /**
     * Method runs when markdown finishes loading. If markdownSectionID exists, modal content is replaced with chosen section's content
     */
    onMarkdownReady(): void {
        if (this.markdownSectionID) {
            document.getElementsByClassName(this.markdownClass)[0].innerHTML =
                document.getElementById(this.markdownSectionID).innerHTML;
        }
    }
}
