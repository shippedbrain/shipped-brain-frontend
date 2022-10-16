import { TestBed } from '@angular/core/testing';
import { ModelCommentsService } from './model-comments.service';

describe('ModelCommentsService', () => {
    let service: ModelCommentsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ModelCommentsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
