import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModelComponent } from './model.component';

describe('ModelComponent', () => {
    let component: ModelComponent;
    let fixture: ComponentFixture<ModelComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ModelComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
