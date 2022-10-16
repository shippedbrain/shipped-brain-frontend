import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModelRequestComponent } from './model-request.component';

describe('ModelRequestComponent', () => {
    let component: ModelRequestComponent;
    let fixture: ComponentFixture<ModelRequestComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ModelRequestComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelRequestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
