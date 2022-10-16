import { TestBed } from '@angular/core/testing';
import { ModelRequestsService } from './model-requests.service';

describe('ModelRequestsService', () => {
    let service: ModelRequestsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ModelRequestsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
