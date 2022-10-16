import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModelsComponent } from './models.component';

describe('ModelsComponent', () => {
    let component: ModelsComponent;
    let fixture: ComponentFixture<ModelsComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ModelsComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
