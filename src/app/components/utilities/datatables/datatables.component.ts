import { AfterViewInit, Component, Input } from '@angular/core';
import { DataTable } from 'simple-datatables';

@Component({
    selector: 'app-datatables',
    templateUrl: './datatables.component.html',
    styleUrls: ['./datatables.component.scss'],
})
export class DatatablesComponent implements AfterViewInit {
    @Input() tableID: string;
    @Input() title: string;
    @Input() columnHeadings: any[];
    @Input() data: any[];
    @Input() columns: any[];

    constructor() {}

    ngAfterViewInit(): void {
        // TODO: Allow component to also work with server data
        if (this.tableID && this.columnHeadings && this.data) {
            this.buildDatatable();
        }
    }

    /**
     * Build datatable from input values
     */
    buildDatatable(): void {
        new DataTable(`#${this.tableID}`, {
            searchable: true,
            columns: this.columns,
            data: {
                headings: this.columnHeadings,
                data: this.data,
            },
            perPage: 5,
        });
    }
}
