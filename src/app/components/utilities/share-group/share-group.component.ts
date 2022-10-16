import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-share-group',
    templateUrl: './share-group.component.html',
    styleUrls: ['./share-group.component.scss'],
})
export class ShareGroupComponent implements OnInit {
    @Input() targetName: string;
    @Input() showTitle: boolean = true;
    completeUrl: string;

    constructor() {}

    ngOnInit(): void {
        this.completeUrl = window.location.href;
    }
}
