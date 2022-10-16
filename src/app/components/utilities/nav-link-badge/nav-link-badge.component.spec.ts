import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavLinkBadgeComponent } from './nav-link-badge.component';

describe('NavLinkBadgeComponent', () => {
    let component: NavLinkBadgeComponent;
    let fixture: ComponentFixture<NavLinkBadgeComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [NavLinkBadgeComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(NavLinkBadgeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
