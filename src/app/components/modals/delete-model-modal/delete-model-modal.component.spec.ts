import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DeleteModelModalComponent } from './delete-model-modal.component';

describe('DeleteModelModalComponent', () => {
    let component: DeleteModelModalComponent;
    let fixture: ComponentFixture<DeleteModelModalComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [DeleteModelModalComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteModelModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
