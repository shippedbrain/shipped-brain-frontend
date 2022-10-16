import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FeatureAccessRequestComponent } from './feature-access-request.component';

describe('FeatureAccessRequestComponent', () => {
    let component: FeatureAccessRequestComponent;
    let fixture: ComponentFixture<FeatureAccessRequestComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [FeatureAccessRequestComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(FeatureAccessRequestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
