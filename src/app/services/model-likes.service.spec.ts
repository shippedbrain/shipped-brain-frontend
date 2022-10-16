import { TestBed } from '@angular/core/testing';
import { ModelLikesService } from './model-likes.service';

describe('ModelLikesService', () => {
    let service: ModelLikesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ModelLikesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
