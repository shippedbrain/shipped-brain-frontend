import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-info-message',
    templateUrl: './info-message.component.html',
    styleUrls: ['./info-message.component.scss'],
})
export class InfoMessageComponent implements OnInit {
    @Input() type: string;
    @Input() content: string;
    @Input() size: string;
    @Input() hasIcon: boolean = true;
    alertClass: string = '';
    icon: string = '';

    constructor() {}

    ngOnInit(): void {
        this.setAlertClass();
        this.setIcon();
    }

    /**
     * Set alertClass based on type passed as prop
     */
    setAlertClass(): void {
        switch (this.type) {
            case 'success':
                this.alertClass = 'alert-green';
                break;
            case 'error':
                this.alertClass = 'alert-magenta';
                break;
            case 'warning':
                this.alertClass = 'alert-yellow';
                break;
            case 'info':
            case 'prize':
                this.alertClass = 'alert-blue';
                break;
            default:
                this.alertClass = 'alert-dark';
        }

        this.alertClass += this.size ? ` alert-${this.size}` : '';
    }

    /**
     * Set icon based on type passed as prop
     */
    setIcon(): void {
        switch (this.type) {
            case 'success':
                this.icon = 'check_circle';
                break;
            case 'error':
                this.icon = 'error';
                break;
            case 'warning':
                this.icon = 'warning';
                break;
            case 'info':
                this.icon = 'info';
                break;
            case 'prize':
                this.icon = 'flash_on';
                break;
            default:
                this.icon = 'info';
        }
    }
}
