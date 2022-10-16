import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ModelCommentsService {
    constructor(private http: HttpClient) {}

    /**
     * Adds a new comment to model
     *
     * @param modelName Name of model to add comment to
     * @param comment Comment's content
     * @returns Observable containing response from API
     */
    addComment(modelName: string, comment: string): Observable<any> {
        const data = {
            comment,
        };

        return this.http.post<any>(
            `${environment.mainURL}/models/${modelName}/comments`,
            data
        );
    }

    /**
     * Get model's comments
     *
     * @param modelName Name of model to retrieve comments from
     * @param countOnly When false, comments are returned, otherwise it only returns the total count
     * @param pageNumber Page to retrieve
     * @param resultsPerPage Number of results to retrieve
     * @returns Observable containing response from API
     */
    getComments(
        modelName: string,
        countOnly: boolean = false,
        pageNumber: number = 1,
        resultsPerPage: number = 10
    ): Observable<any> {
        const params = new HttpParams()
            .set('count_only', `${countOnly}`)
            .set('page_number', `${pageNumber}`)
            .set('results_per_page', `${resultsPerPage}`);

        return this.http.get<any>(`${environment.mainURL}/models/${modelName}/comments`, {
            params,
        });
    }

    /**
     * Delete model comment
     *
     * @param modelName Model that comment belongs to
     * @param commentID ID of comment to delete
     * @returns Observable containing response from API
     */
    deleteComment(modelName: string, commentID: number): Observable<any> {
        return this.http.delete<any>(
            `${environment.mainURL}/models/${modelName}/comments/${commentID}`
        );
    }
}
