import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { catchError, finalize } from 'rxjs/operators';
import { ModelRequest } from 'src/app/models/model-request/model-request';
import { ModelRequestsService } from 'src/app/services/model-requests.service';

@Component({
    selector: 'app-model-request',
    templateUrl: './model-request.component.html',
    styleUrls: ['./model-request.component.scss'],
})
export class ModelRequestComponent implements OnInit {
    modelRequestID: number;
    modelRequest: ModelRequest = new ModelRequest();
    modelRequestPrize: string = `<b>Prize:</b> 100 API calls`;
    loading: any = {
        modelRequest: false,
    };

    constructor(
        private route: ActivatedRoute,
        private modelRequestsService: ModelRequestsService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((routeParams) => {
            this.modelRequestID = +routeParams.requestid;

            if (this.modelRequestID) {
                this.getModelRequest();
            }
        });
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
     * Get model request by ID
     */
    getModelRequest(): void {
        this.modelRequestsService
            .getModelRequest(this.modelRequestID)
            .pipe(finalize(() => (this.loading.modelRequest = false)))
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.modelRequest = response.data.results;
            });
    }
}
