import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModelRequestsListComponent } from './model-requests-list.component';

describe('ModelRequestsListComponent', () => {
    let component: ModelRequestsListComponent;
    let fixture: ComponentFixture<ModelRequestsListComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ModelRequestsListComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelRequestsListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
