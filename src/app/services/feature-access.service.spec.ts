import { TestBed } from '@angular/core/testing';
import { FeatureAccessService } from './feature-access.service';

describe('FeatureAccessService', () => {
    let service: FeatureAccessService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FeatureAccessService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
