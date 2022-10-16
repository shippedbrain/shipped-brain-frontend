import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-markdown',
    templateUrl: './markdown.component.html',
    styleUrls: ['./markdown.component.scss'],
})
export class MarkdownComponent implements OnInit {
    @Input() file: string;
    @Input() showNavigation: boolean = true;
    @Input() isExternalFile: boolean = false;
    @Input() isRawString: boolean = false;
    @Input() imagesBaseURL: string = '';
    anchors: any[] = [];
    currentHash: string = '';
    baseUrl: string = '';
    appBaseUrl: string = '';

    constructor() {}

    ngOnInit(): void {
        this.baseUrl = document.location.pathname;
        this.appBaseUrl = document.location.origin;
    }

    /**
     * Checks if URL contains hash when markdown is first loaded
     */
    hasCurrentHash(): void {
        this.currentHash = window.location.hash;

        if (this.currentHash) {
            // Remove # from currentHash because window.location.hash will return a string like #my-hash
            this.currentHash = this.currentHash.replace('#', '');

            this.setCurrentHash(this.currentHash);
        }
    }

    /**
     * Gets all h1's from loaded markdown to populate anchors array.
     * Method is called when markdown has finished loading.
     */
    onMarkdownReady(): void {
        const anchorHeadings = document.querySelectorAll('.markdown-header-anchor');

        anchorHeadings.forEach((anchorHeading) => {
            const title: string = anchorHeading.textContent;
            const escapedText = this.getFriendlyUrl(title);

            anchorHeading.innerHTML = `<span id="${escapedText}">${title}</span>`;

            this.anchors.push({
                href: escapedText,
                title,
            });
        });

        if (this.isExternalFile || this.isRawString) {
            this.parseImagesSrc();
        }

        if (this.showNavigation) {
            this.hasCurrentHash();
        }
    }

    /**
     * Replaces image's local src path with external URL
     */
    parseImagesSrc(): void {
        const images = document.querySelectorAll('.markdown img');

        images.forEach((image: HTMLImageElement) => {
            if (image.src.startsWith(this.appBaseUrl)) {
                image.src = image.src.replace(this.appBaseUrl, this.imagesBaseURL);
            }
        });
    }

    /**
     * Parses title to return a friendly URL hash
     *
     * @param title Title to parse
     * @returns Friendly URL hash
     */
    getFriendlyUrl(title: string): string {
        return title.toLowerCase().replace(/[^\w]+/g, '-');
    }

    /**
     * Sets currentHash with hash parameter value and opens respective details element
     *
     * @param hash Hash to set
     */
    setCurrentHash(hash: string): void {
        this.currentHash = hash;

        // Open parent details element of current hash
        document.getElementById(this.currentHash).closest('details').open = true;
    }
}
