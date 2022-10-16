import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MarkdownInfoModalComponent } from './markdown-info-modal.component';

describe('MarkdownInfoModalComponent', () => {
    let component: MarkdownInfoModalComponent;
    let fixture: ComponentFixture<MarkdownInfoModalComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [MarkdownInfoModalComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MarkdownInfoModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
