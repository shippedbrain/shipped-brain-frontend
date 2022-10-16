import { Component, Input } from '@angular/core';
import { Model } from 'src/app/models/model/model';

@Component({
    selector: 'app-model-card-grid',
    templateUrl: './model-card-grid.component.html',
    styleUrls: ['./model-card-grid.component.scss'],
})
export class ModelCardGridComponent {
    @Input() models: Model[];
    @Input() isOwner: boolean = false;

    constructor() {}
}
