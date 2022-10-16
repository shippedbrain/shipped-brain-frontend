import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { catchError } from 'rxjs/operators';
import { ModelLike } from 'src/app/models/model-like/model-like';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { ModelLikesService } from 'src/app/services/model-likes.service';

@Component({
    selector: 'app-likes',
    templateUrl: './likes.component.html',
    styleUrls: ['./likes.component.scss'],
})
export class LikesComponent implements OnInit {
    user: User;
    modelLikes: ModelLike[];
    modelLikesColumnHeadings: any[] = ['Model', 'Time'];
    modelLikesProperties: any[] = ['model_name', 'created_at'];
    modelLikesData: any[] = [];
    modelLikesColumnsCustom: any[] = [];

    constructor(
        private authService: AuthService,
        private modelLikesService: ModelLikesService
    ) {}

    ngOnInit(): void {
        if (this.authService.isLoggedIn()) {
            this.getCurrentUser();
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
     * Gets current user. If current user's data is found, methods with other API requests are called
     */
    getCurrentUser(): void {
        this.authService
            .getCurrentUser()
            .pipe(
                catchError((error) => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.user = response.data.results;

                this.getModelsUserLiked();
            });
    }

    /**
     * Gets models current user liked
     */
    getModelsUserLiked(): void {
        this.modelLikesService
            .getUserLikes(this.user.username)
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.modelLikes = response.data.results;

                this.setModelLikesCustomColumns();
            });
    }

    /**
     * Returns link to model page
     *
     * @param data Cell's text
     * @param cell Cell's HTML
     * @param row Row's HTML
     * @returns Link to model page
     */
    renderModelColumn(
        data: string,
        cell: HTMLTableCellElement,
        row: HTMLTableRowElement
    ): string {
        return data
            ? `<a href="/models/${data}" class="link link-magenta">${data}</a>`
            : 'N/D';
    }

    /**
     * Returns formatted datetime
     *
     * @param data Datetime to format
     * @returns Formatted datetime
     */
    renderDateTimeColumn(data: string): string {
        return data ? moment(data).format('YYYY-MM-DD HH:mm') : 'N/D';
    }

    /**
     * Sets columns for model usage table with custom HTML
     */
    setModelLikesCustomColumns(): void {
        for (let i = 0; i < this.modelLikes.length; i++) {
            this.modelLikesData[i] = [];

            this.modelLikesProperties.forEach((property) => {
                if (property === 'user') {
                    this.modelLikesData[i].push(this.modelLikes[i].user_id);
                } else {
                    this.modelLikesData[i].push(this.modelLikes[i][property]);
                }
            });
        }

        this.modelLikesColumnsCustom = [
            { select: 0, render: this.renderModelColumn }, // Model
            { select: 1, render: this.renderDateTimeColumn }, // Call Time
        ];
    }
}
