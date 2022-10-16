import { TestBed } from '@angular/core/testing';
import { ModelsUploadService } from './models-upload.service';

describe('ModelsUploadService', () => {
    let service: ModelsUploadService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ModelsUploadService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
