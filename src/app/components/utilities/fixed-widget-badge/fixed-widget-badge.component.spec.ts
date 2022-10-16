import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FixedWidgetBadgeComponent } from './fixed-widget-badge.component';

describe('FixedWidgetBadgeComponent', () => {
    let component: FixedWidgetBadgeComponent;
    let fixture: ComponentFixture<FixedWidgetBadgeComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [FixedWidgetBadgeComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(FixedWidgetBadgeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
