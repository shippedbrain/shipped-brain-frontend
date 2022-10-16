import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ModelUploadComponent } from './model-upload.component';

describe('ModelUploadComponent', () => {
    let component: ModelUploadComponent;
    let fixture: ComponentFixture<ModelUploadComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ModelUploadComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(ModelUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
