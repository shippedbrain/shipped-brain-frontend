import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SidebarNavComponent } from './sidebar-nav.component';

describe('SidebarNavComponent', () => {
    let component: SidebarNavComponent;
    let fixture: ComponentFixture<SidebarNavComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [SidebarNavComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarNavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
