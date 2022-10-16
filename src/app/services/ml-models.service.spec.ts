import { TestBed } from '@angular/core/testing';
import { MlModelsService } from './ml-models.service';

describe('MlModelsService', () => {
    let service: MlModelsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(MlModelsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
