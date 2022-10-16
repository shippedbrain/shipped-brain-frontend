import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { catchError } from 'rxjs/operators';
import { ModelUpload } from 'src/app/models/model-upload/model-upload';
import { Model } from 'src/app/models/model/model';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { ModelsUploadService } from 'src/app/services/models-upload.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.scss'],
})
export class SummaryComponent implements OnInit {
    user: User;
    authToken: string = '';
    modelUploads: ModelUpload[];
    modelUploadsColumnHeadings: any[] = ['Model', 'Status', 'Upload Date'];
    modelUploadsProperties: any[] = ['model_name', 'status', 'started_at'];
    modelUploadsData: any[] = [];
    modelUploadsColumnsCustom: any[] = [];
    modelUsage: Model[];
    modelUsageColumnHeadings: any[] = ['Model', 'Creator', 'Call Time'];
    modelUsageProperties: any[] = ['name', 'user', 'call_time'];
    modelUsageData: any[] = [];
    modelUsageColumnsCustom: any[] = [];
    apiCalls: any[];
    apiCallsChartLabels: string[] = [];
    apiCallsChartValues: any[] = [];
    apiCallsRemainingChartLabels: any[] = ['Used', 'Left'];
    apiCallsRemainingChartValues: any[] = [];

    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private modelUploadsService: ModelsUploadService
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

                this.getAuthToken();
                this.getUserAPICalls();
                this.getModelUsage();
                this.getModelUploads();
            });
    }

    /**
     * Sets authToken with current user's token
     */
    getAuthToken(): void {
        this.authToken = this.authService.getUserToken();
    }

    /**
     * Gets API calls of current user
     */
    getUserAPICalls(): void {
        this.usersService
            .getAPICallsByUser()
            .pipe(
                catchError((error) => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.apiCalls = response.data.results;

                // Get unique model names
                this.apiCallsChartLabels = [
                    ...new Set(this.apiCalls.map((call) => call.model_name)),
                ];

                // Get api call count for each model
                this.apiCallsChartLabels.forEach((modelName) => {
                    this.apiCallsChartValues.push(
                        this.apiCalls.filter((call) => call.model_name === modelName).length
                    );
                });

                this.apiCallsRemainingChartValues.push(
                    this.user.api_calls_count,
                    this.user.api_calls_left
                );
            });
    }

    /**
     * Gets model usage of current user
     */
    getModelUsage(): void {
        this.usersService
            .getModelUsageByUser()
            .pipe(
                catchError((error) => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.modelUsage = response.data.results.models;

                this.setModelUsageCustomColumns();
            });
    }

    /**
     * Gets all model uploads of current user
     */
    getModelUploads(): void {
        this.modelUploadsService
            .getUserModelUploads(this.user.username)
            .pipe(
                catchError((error: any) => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.modelUploads = response.data.results;

                this.setModelUploadsColumns();
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
     * Returns link to profile page
     *
     * @param data Cell's text
     * @returns Link to profile page
     */
    renderUserColumn(data: string): string {
        return data
            ? `<a href="/profiles/${data}" class="link link-magenta">${data}</a>`
            : 'N/D';
    }

    /**
     * Returns formatted date
     *
     * @param data Date to format
     * @returns Formatted date
     */
    renderDateColumn(data: string): string {
        return data ? moment(data).format('YYYY-MM-DD') : 'N/D';
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
     * Returns alert based on status parameter
     *
     * @param data Status to format
     * @returns Span with alert for status
     */
    renderStatusColumn(data: string): string {
        switch (data) {
            case 'finished':
                return `<div class="alert alert-green alert-center alert-sm font-bold">${data.toUpperCase()}</div>`;
            case 'failed':
                return `<div class="alert alert-red alert-center alert-sm font-bold">${data.toUpperCase()}</div>`;
            case 'running':
                return `<div class="alert alert-yellow alert-center alert-sm font-bold">${data.toUpperCase()}</div>`;
            case 'queued':
                return `<div class="alert alert-blue alert-center alert-sm font-bold">${data.toUpperCase()}</div>`;
            case 'canceled':
                return `<div class="alert alert-dark alert-center alert-sm font-bold">${data.toUpperCase()}</div>`;
        }
    }

    /**
     * Sets columns for model usage table with custom HTML
     */
    setModelUsageCustomColumns(): void {
        for (let i = 0; i < this.modelUsage.length; i++) {
            this.modelUsageData[i] = [];

            this.modelUsageProperties.forEach((property) => {
                if (property === 'user') {
                    this.modelUsageData[i].push(this.modelUsage[i].user_id);
                } else {
                    this.modelUsageData[i].push(this.modelUsage[i][property]);
                }
            });
        }

        this.modelUsageColumnsCustom = [
            { select: 0, render: this.renderModelColumn }, // Model
            { select: 1, render: this.renderUserColumn }, // Creator
            { select: 2, render: this.renderDateTimeColumn }, // Call Time
        ];
    }

    /**
     * Sets columns for model uploads table with custom HTML
     */
    setModelUploadsColumns(): void {
        for (let i = 0; i < this.modelUploads.length; i++) {
            this.modelUploadsData[i] = [];

            this.modelUploadsProperties.forEach((property) => {
                this.modelUploadsData[i].push(this.modelUploads[i][property]);
            });
        }

        this.modelUploadsColumnsCustom = [
            { select: 0, render: this.renderModelColumn }, // Model
            { select: 1, render: this.renderStatusColumn }, // Status
            { select: 2, render: this.renderDateColumn }, // Upload Date
        ];
    }
}
