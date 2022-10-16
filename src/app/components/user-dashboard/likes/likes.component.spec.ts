import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LikesComponent } from './likes.component';

describe('LikesComponent', () => {
    let component: LikesComponent;
    let fixture: ComponentFixture<LikesComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [LikesComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(LikesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
