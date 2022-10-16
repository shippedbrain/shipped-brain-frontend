import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Hashtag } from 'src/app/models/hashtag/hashtag';
import { Model } from 'src/app/models/model/model';

@Component({
    selector: 'app-model-card',
    templateUrl: './model-card.component.html',
    styleUrls: ['./model-card.component.scss'],
})
export class ModelCardComponent implements OnInit {
    @Input() model: Model;
    @Input() isOwner: boolean;
    modelCategories: Hashtag[];

    constructor() {}

    ngOnInit(): void {
        if (this.model) {
            this.getModelCategories();
        }
    }

    /**
     * Wrapper for moment
     *
     * @param date Date to format
     * @returns Moment object
     */
    moment(date: any): moment.Moment {
        return moment(date);
    }

    /**
     * Gets categories from model
     */
    getModelCategories(): void {
        if (this.model.hashtags) {
            this.modelCategories = this.model.hashtags.filter(
                (category) => category.key === 'category'
            );
        }
    }
}
