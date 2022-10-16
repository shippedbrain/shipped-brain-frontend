import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Model } from '../models/model/model';

@Injectable({
    providedIn: 'root',
})
export class MlModelsService {
    modelsEndpoint: string = '/models';
    modelUploadEndpoint: string = '/deploy';
    modelUsageEndpoint: string = '/usage';
    modelPredictionEndpoint: string = '/predict';
    modelVersionsEndpoint: string = '/versions';

    constructor(private http: HttpClient) {}

    /**
     * Gets paginated models with optional filters
     *
     * @param searchQuery Search query to filters model names by
     * @param order Parameter to order models by
     * @param pageNumber Page number to retrieve
     * @param resultsPerPage Max number of results to retrieve
     * @returns Observable containing response from API
     */
    getRegisteredModels(
        searchQuery: string = '',
        order: string = 'recent',
        pageNumber: number = 1,
        resultsPerPage: number = 1
    ): Observable<Model[]> {
        const params = new HttpParams()
            .set('search_query', searchQuery)
            .set('order', order)
            .set('page_number', pageNumber.toString())
            .set('results_per_page', resultsPerPage.toString());

        return this.http.get<Model[]>(`${environment.mainURL}${this.modelsEndpoint}`, {
            params,
        });
    }

    /**
     * Gets model
     *
     * @param name Name of model to retrieve
     * @param type Parameter determines if all or only select model data should be retrieved
     * @returns Observable containing response from API
     */
    getRegisteredModel(name: string, type: string = 'full'): Observable<Model> {
        const params = new HttpParams().set('type', type);

        return this.http.get<Model>(`${environment.mainURL}${this.modelsEndpoint}/${name}`, {
            params,
        });
    }

    /**
     * Uploads and deploys model
     *
     * @param fileUpload File containg model's files
     * @param description Model's description
     * @returns Observable containing response from API
     */
    uploadModel(fileUpload: File, description: string = ''): Observable<any> {
        const formData: FormData = new FormData();

        formData.append('file', fileUpload);
        formData.append('description', description);

        return this.http.post<any>(
            `${environment.uploadURL}${this.modelUploadEndpoint}`,
            formData
        );
    }

    /**
     * Deletes model version
     *
     * @param modelName Name of model to retrieve
     * @param modelVersion Model's version to delete
     * @returns Observable containing response from API
     */
    deleteModelVersion(modelName: string, modelVersion: number): Observable<any> {
        return this.http.delete<any>(
            `${environment.mainURL}${this.modelsEndpoint}/${modelName}/${modelVersion}`
        );
    }

    /**
     * Gets model's API calls' history
     *
     * @param modelName Name of model to retrieve
     * @param sample Time interval to get results by
     * @returns Observable containing response from API
     */
    getModelUsage(modelName: string, sample: string = '1Min'): Observable<any> {
        return this.http.get<any>(
            `${environment.mainURL}${this.modelsEndpoint}/${modelName}${this.modelUsageEndpoint}?sample=${sample}`
        );
    }

    /**
     * Makes prediction for model with given data
     *
     * @param modelName Name of model to retrieve
     * @param data Data used for prediction
     * @returns Observable containing response from API
     */
    makePrediction(modelName: string, data: any): Observable<any> {
        return this.http.post<any>(
            `${environment.mainURL}${this.modelPredictionEndpoint}/${modelName}`,
            data
        );
    }

    /**
     * Gets list of versions for given model
     *
     * @param modelName Name of model to get versions from
     * @returns Observable containing response from API
     */
    getModelVersions(modelName: string): Observable<Model[]> {
        return this.http.get<Model[]>(
            `${environment.mainURL}${this.modelVersionsEndpoint}/${modelName}`
        );
    }

    /**
     * Creates model
     *
     * @param model Model's data
     * @returns Observable containing response from API
     */
    createModel(model: Model): Observable<any> {
        return this.http.post<any>(
            `${environment.mainURL}${this.modelsEndpoint}/create`,
            model
        );
    }

    /**
     * Updates model's data
     *
     * @param model Model to update
     * @returns Observable containing response from API
     */
    updateModel(model: Model): Observable<any> {
        const body = {
            description: model.description,
            metrics: model.metrics,
            parameters: model.parameters,
            github_repo: model.github_repo,
            input_example: model.input_example,
            signature: model.signature,
        };

        return this.http.put<any>(
            `${environment.mainURL}${this.modelsEndpoint}/${model.name}`,
            body
        );
    }

    /**
     * Adds cover photo to model
     *
     * @param model Model to add cover photo to
     * @param coverPhoto File object containing cover photo
     * @returns Observable containing response from API
     */
    uploadModelCoverPhoto(model: Model, coverPhoto: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('cover_photo', coverPhoto);

        return this.http.post<any>(
            `${environment.mainURL}${this.modelsEndpoint}/${model.name}/cover`,
            formData
        );
    }
}
