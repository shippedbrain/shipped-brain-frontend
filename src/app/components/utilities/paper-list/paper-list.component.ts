import { Component, Input } from '@angular/core';
import { PapersWithCode } from 'src/app/models/papers-with-code/papers-with-code';

@Component({
    selector: 'app-paper-list',
    templateUrl: './paper-list.component.html',
    styleUrls: ['./paper-list.component.scss'],
})
export class PaperListComponent {
    @Input() papers: PapersWithCode[];

    constructor() {}
}
