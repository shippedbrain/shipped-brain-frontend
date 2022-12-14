import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CreateModelComponent } from './create-model.component';

describe('CreateModelComponent', () => {
    let component: CreateModelComponent;
    let fixture: ComponentFixture<CreateModelComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [CreateModelComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateModelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
