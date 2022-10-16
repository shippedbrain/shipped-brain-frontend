import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModelRequestFormComponent } from './model-request-form.component';

describe('ModelRequestFormComponent', () => {
    let component: ModelRequestFormComponent;
    let fixture: ComponentFixture<ModelRequestFormComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ModelRequestFormComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelRequestFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
