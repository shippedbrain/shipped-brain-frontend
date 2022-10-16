import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PapersWithCode } from '../models/papers-with-code/papers-with-code';

@Injectable({
    providedIn: 'root',
})
export class PapersWithCodeService {
    constructor(private http: HttpClient) {}

    /**
     * Gets paginated papers with code with optional filters
     *
     * @param searchQuery Search query to filter papers' names by
     * @param pageNumber Page number to retrieve
     * @param resultsPerPage Max number of results to retrieve
     * @returns Observable containing response from API
     */
    getPapersWithCode(
        searchQuery: string = '',
        pageNumber: number = 1,
        resultsPerPage: number = 10
    ): Observable<PapersWithCode[]> {
        const params = new HttpParams()
            .set('search_query', searchQuery)
            .set('page_number', pageNumber.toString())
            .set('results_per_page', resultsPerPage.toString());

        return this.http.get<PapersWithCode[]>(`${environment.mainURL}/papers-with-code`, {
            params,
        });
    }

    /**
     * Gets paper with code by ID
     *
     * @param paperID ID of paper to retrieve
     * @returns Observable containing response from API
     */
    getPaperById(paperID: string): Observable<PapersWithCode> {
        return this.http.get<PapersWithCode>(
            `${environment.mainURL}/papers-with-code/${paperID}`
        );
    }
}
