import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { DatatablesComponent } from './datatables.component';

describe('DatatablesComponent', () => {
    let component: DatatablesComponent;
    let fixture: ComponentFixture<DatatablesComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [DatatablesComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DatatablesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
