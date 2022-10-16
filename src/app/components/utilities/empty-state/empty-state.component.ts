import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-empty-state',
    templateUrl: './empty-state.component.html',
    styleUrls: ['./empty-state.component.scss'],
})
export class EmptyStateComponent implements OnInit {
    @Input() mainTitle: string = 'No results found';
    @Input() subTitle: string;

    constructor() {}

    ngOnInit(): void {
        this.addParticles();
    }

    /**
     * Iterates and appends particles to particles container
     */
    addParticles(): void {
        const particlesContainer = document.querySelector('.particles-container');

        for (let i = 0; i < 400; i++) {
            const particle = document.createElement('div');

            particle.classList.add('particle');
            particlesContainer.appendChild(particle);
        }
    }
}
