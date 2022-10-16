import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ModelLikesService {
    constructor(private http: HttpClient) {}

    /**
     * Adds or removes like from model depending on whether user liked it previously
     *
     * @param modelName Model name to toggle like from
     * @returns Observable containing response from API
     */
    toggleLike(modelName: string): Observable<any> {
        return this.http.post<any>(`${environment.mainURL}/model-likes/${modelName}`, {});
    }

    /**
     * Gets model's likes
     *
     * @param modelName Model name to get likes from
     * @param username Username to check if current user liked model
     * @param countOnly When true, only count of model's likes is returned, otherwise all data is
     * @returns Observable containing response from API
     */
    getModelLikes(
        modelName: string,
        username: string = '',
        countOnly: boolean = false
    ): Observable<any> {
        const params = new HttpParams()
            .set('username', username)
            .set('count_only', `${countOnly}`);

        return this.http.get<any>(`${environment.mainURL}/model-likes/${modelName}`, {
            params,
        });
    }

    /**
     * Get user's model likes
     *
     * @param username Username to get comments from
     * @returns Observable containing response from API
     */
    getUserLikes(username: string): Observable<any> {
        return this.http.get<any>(`${environment.mainURL}/users/${username}/model-likes`);
    }
}
