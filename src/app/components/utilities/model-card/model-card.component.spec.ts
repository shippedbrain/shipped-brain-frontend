import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModelCardComponent } from './model-card.component';

describe('ModelCardComponent', () => {
    let component: ModelCardComponent;
    let fixture: ComponentFixture<ModelCardComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ModelCardComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
