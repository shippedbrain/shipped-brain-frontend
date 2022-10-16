import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { catchError, finalize } from 'rxjs/operators';
import { PapersWithCode } from 'src/app/models/papers-with-code/papers-with-code';
import { PapersWithCodeService } from 'src/app/services/papers-with-code.service';

@Component({
    selector: 'app-paper',
    templateUrl: './paper.component.html',
    styleUrls: ['./paper.component.scss'],
})
export class PaperComponent implements OnInit {
    paperID: string;
    paper: PapersWithCode;
    loading: any = {
        paper: false,
    };

    constructor(
        private route: ActivatedRoute,
        private papersWithCodeService: PapersWithCodeService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((routeParams) => {
            this.paperID = routeParams.paperid;

            if (this.paperID) {
                this.getPaperByID();
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
     * Gets paper by ID
     */
    getPaperByID(): void {
        this.loading.paper = true;

        this.papersWithCodeService
            .getPaperById(this.paperID)
            .pipe(finalize(() => (this.loading.paper = false)))
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.paper = response.data.results;
            });
    }
}
