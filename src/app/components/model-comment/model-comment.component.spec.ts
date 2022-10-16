import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModelCommentComponent } from './model-comment.component';

describe('ModelCommentComponent', () => {
    let component: ModelCommentComponent;
    let fixture: ComponentFixture<ModelCommentComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ModelCommentComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelCommentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
