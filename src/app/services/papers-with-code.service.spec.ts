import { TestBed } from '@angular/core/testing';
import { PapersWithCodeService } from './papers-with-code.service';

describe('PapersWithCodeService', () => {
    let service: PapersWithCodeService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PapersWithCodeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
