import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
    selector: 'tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
    @Input() tabsLg: boolean = false;
    @Input() showSeparator: boolean = false;
    @Input() noPadding: boolean = false;
    @Output() tabClicked: EventEmitter<TabComponent> = new EventEmitter<TabComponent>();
    tabs: TabComponent[] = [];

    constructor() {}

    /**
     * Adds tab to tab list
     *
     * @param tab Tab to add
     */
    addTab(tab: TabComponent): void {
        if (this.tabs.length === 0) {
            tab.active = true;
        }

        this.tabs.push(tab);
    }

    /**
     * Changes active tab.
     * Removes active property from all tabs and sets it to true for tab parameter.
     *
     * @param tabToShow Tab to show
     */
    selectTab(tabToShow: TabComponent): void {
        this.tabs.forEach((tab: TabComponent) => {
            tab.active = false;
        });

        tabToShow.active = true;
        this.tabClicked.emit(tabToShow);
    }
}
