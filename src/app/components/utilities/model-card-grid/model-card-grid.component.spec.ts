import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModelCardGridComponent } from './model-card-grid.component';

describe('ModelCardGridComponent', () => {
    let component: ModelCardGridComponent;
    let fixture: ComponentFixture<ModelCardGridComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ModelCardGridComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelCardGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
