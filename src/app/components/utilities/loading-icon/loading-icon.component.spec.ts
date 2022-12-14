import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoadingIconComponent } from './loading-icon.component';

describe('LoadingIconComponent', () => {
    let component: LoadingIconComponent;
    let fixture: ComponentFixture<LoadingIconComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [LoadingIconComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(LoadingIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
