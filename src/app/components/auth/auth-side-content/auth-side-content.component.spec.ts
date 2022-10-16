import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AuthSideContentComponent } from './auth-side-content.component';

describe('AuthSideContentComponent', () => {
    let component: AuthSideContentComponent;
    let fixture: ComponentFixture<AuthSideContentComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [AuthSideContentComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(AuthSideContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
