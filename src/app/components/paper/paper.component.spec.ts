import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PaperComponent } from './paper.component';

describe('PaperComponent', () => {
    let component: PaperComponent;
    let fixture: ComponentFixture<PaperComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [PaperComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PaperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
