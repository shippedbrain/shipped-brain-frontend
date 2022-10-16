import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-auth-side-content',
    templateUrl: './auth-side-content.component.html',
    styleUrls: ['./auth-side-content.component.scss'],
})
export class AuthSideContentComponent implements OnInit, OnDestroy {
    constructor() {}

    ngOnInit(): void {
        this.toggleNavbar('hide');
    }

    ngOnDestroy() {
        this.toggleNavbar('show');
    }

    /**
     * Hides or shows the navbar depending on type parameter
     *
     * @param type When parameter equals 'show', the navbar is shown, otherwise it's hidden
     */
    toggleNavbar(type: 'show' | 'hide') {
        const navbar = document.querySelector('nav.navbar');

        type === 'show' ? navbar.classList.remove('d-none') : navbar.classList.add('d-none');
    }
}
