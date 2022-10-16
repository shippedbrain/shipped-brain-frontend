import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { catchError, finalize } from 'rxjs/operators';
import { ModelRequest } from 'src/app/models/model-request/model-request';
import { ModelRequestsService } from 'src/app/services/model-requests.service';

@Component({
    selector: 'app-model-requests-list',
    templateUrl: './model-requests-list.component.html',
    styleUrls: ['./model-requests-list.component.scss'],
})
export class ModelRequestsListComponent implements OnInit {
    loading: any = {
        modelRequests: false,
    };
    modelRequests: ModelRequest[] = [];
    modelRequestsFilters: object[] = [
        { name: 'All', key: '', class: 'pill-magenta-dark' },
        { name: 'Open', key: 'open', class: 'pill-green' },
        { name: 'Closed', key: 'closed', class: 'pill-blue' },
        { name: 'Cancelled', key: 'cancelled', class: 'pill-magenta' },
    ];
    activeStatus: string = '';
    recentRequests: number;
    modelRequestPrize: string = `<b>Prize:</b> 100 API calls`;
    noModelRequestsMessage: string = `No model requests to show`;

    constructor(private modelRequestsService: ModelRequestsService) {}

    ngOnInit(): void {
        this.getModelRequests();
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
     * Get list of model requests
     */
    getModelRequests(): void {
        this.modelRequestsService
            .getModelRequests(this.activeStatus)
            .pipe(finalize(() => (this.loading.modelRequests = false)))
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.modelRequests = response.data.results;

                this.setNrOfRecentRequests();
            });
    }

    /**
     * Sets active model requests status to filter by and calls getModelRequests method
     *
     * @param statusKey Status to filter by
     */
    filterByStatus(statusKey: string = '') {
        this.activeStatus = this.activeStatus === statusKey ? '' : statusKey;
        this.getModelRequests();
    }

    /**
     * Checks how many model requests were made in the last 24 hours
     */
    setNrOfRecentRequests(): void {
        this.recentRequests = this.modelRequests.filter(
            (modelRequest) => modelRequest.is_recent === true
        ).length;
    }
}
