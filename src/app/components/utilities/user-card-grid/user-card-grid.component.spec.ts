import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { UserCardGridComponent } from './user-card-grid.component';

describe('UserCardGridComponent', () => {
    let component: UserCardGridComponent;
    let fixture: ComponentFixture<UserCardGridComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [UserCardGridComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(UserCardGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
