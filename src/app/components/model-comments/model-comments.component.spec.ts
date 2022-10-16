import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModelCommentsComponent } from './model-comments.component';

describe('ModelCommentsComponent', () => {
    let component: ModelCommentsComponent;
    let fixture: ComponentFixture<ModelCommentsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ModelCommentsComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelCommentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
