import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DeployComponent } from './deploy.component';

describe('DeployComponent', () => {
    let component: DeployComponent;
    let fixture: ComponentFixture<DeployComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [DeployComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DeployComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
