import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NavMenuItemsComponent } from './nav-menu-items.component';

describe('NavMenuItemsComponent', () => {
    let component: NavMenuItemsComponent;
    let fixture: ComponentFixture<NavMenuItemsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [NavMenuItemsComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(NavMenuItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
