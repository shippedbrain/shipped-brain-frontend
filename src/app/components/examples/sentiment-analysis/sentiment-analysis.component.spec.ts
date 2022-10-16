import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SentimentAnalysisComponent } from './sentiment-analysis.component';

describe('SentimentAnalysisComponent', () => {
    let component: SentimentAnalysisComponent;
    let fixture: ComponentFixture<SentimentAnalysisComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [SentimentAnalysisComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(SentimentAnalysisComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
