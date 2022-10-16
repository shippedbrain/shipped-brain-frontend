import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DeleteModelCommentModalComponent } from './delete-model-comment-modal.component';

describe('DeleteCommentModalComponent', () => {
    let component: DeleteModelCommentModalComponent;
    let fixture: ComponentFixture<DeleteModelCommentModalComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [DeleteModelCommentModalComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteModelCommentModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
