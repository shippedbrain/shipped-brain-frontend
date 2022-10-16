import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModelRequest } from '../models/model-request/model-request';

@Injectable({
    providedIn: 'root',
})
export class ModelRequestsService {
    modelRequestsEndpoint: string = '/model-requests';

    constructor(private http: HttpClient) {}

    /**
     * Gets model requests
     *
     * @param status Status to filter requests by
     * @param searchQuery Search query to filter requests by
     * @returns Observable containing response from API
     */
    getModelRequests(
        status: string = '',
        searchQuery: string = ''
    ): Observable<ModelRequest[]> {
        const params = new HttpParams().set('status', status).set('search_query', searchQuery);

        return this.http.get<ModelRequest[]>(
            `${environment.mainURL}${this.modelRequestsEndpoint}`,
            { params }
        );
    }

    /**
     * Gets model request by ID
     *
     * @param modelRequestID Model request ID
     * @returns Observable containing response from API
     */
    getModelRequest(modelRequestID: number): Observable<ModelRequest> {
        return this.http.get<ModelRequest>(
            `${environment.mainURL}${this.modelRequestsEndpoint}/${modelRequestID}`
        );
    }

    /**
     * Creates a new model request
     *
     * @param modelRequest Model request data
     * @returns Observable containing response from API
     */
    saveModelRequest(modelRequest: ModelRequest): Observable<any> {
        return this.http.post<any>(
            `${environment.mainURL}${this.modelRequestsEndpoint}`,
            modelRequest
        );
    }
}
