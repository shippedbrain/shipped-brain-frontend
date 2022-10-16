import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PaperListItemComponent } from './paper-list-item.component';

describe('PaperListItemComponent', () => {
    let component: PaperListItemComponent;
    let fixture: ComponentFixture<PaperListItemComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [PaperListItemComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(PaperListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
