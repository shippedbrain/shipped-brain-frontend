import { Component, Input } from '@angular/core';
import { TabsComponent } from '../tabs/tabs.component';

@Component({
    selector: 'tab',
    templateUrl: './tab.component.html',
    styleUrls: ['./tab.component.scss'],
})
export class TabComponent {
    @Input() tabTitle: string = '';
    @Input() showBadge: boolean = false;
    @Input() badgeContent: string = '';
    @Input() spaced: boolean = false;
    @Input() noPadding: boolean = false;
    active: boolean = false;

    constructor(tabs: TabsComponent) {
        tabs.addTab(this);
    }
}
