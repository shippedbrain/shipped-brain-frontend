import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hashtag } from '../models/hashtag/hashtag';

@Injectable({
    providedIn: 'root',
})
export class HashtagService {
    constructor(private http: HttpClient) {}

    /**
     * Get hashtags filtered by key. If no key is given, all hashtags are returned
     *
     * @param key Hashtag key to filter by
     * @returns Observable containing response from API
     */
    getHashtags(key: string = ''): Observable<any> {
        const params = {
            key,
        };

        return this.http.get<any>(`${environment.mainURL}/hashtags`, {
            params,
        });
    }

    /**
     * Adds hashtag to model
     *
     * @param modelName Model to add hashtag to
     * @param hashtag Hashtag to add
     * @returns Observable containing response from API
     */
    addModelHashtag(modelName: string, hashtag: Hashtag): Observable<any> {
        return this.http.post<any>(
            `${environment.mainURL}/models/${modelName}/hashtags`,
            hashtag
        );
    }

    /**
     * Deletes hashtag from model
     *
     * @param modelName Model to delete hashtag from
     * @param hashtagID Hashtag ID to remove from model
     * @returns Observable containing response from API
     */
    deleteModelHashtag(modelName: string, hashtagID: number): Observable<any> {
        return this.http.delete<any>(
            `${environment.mainURL}/models/${modelName}/hashtags/${hashtagID}`
        );
    }

    /**
     * Gets all models that contain given hashtag ID
     *
     * @param hashtagID Hashtag ID to filter models by
     * @returns Observable containing response from API
     */
    getModelsByHashtag(hashtagID: number): Observable<any> {
        const params = new HttpParams().set('hashtag_id', `${hashtagID}`);

        return this.http.get<any>(`${environment.mainURL}/model-hashtags`, {
            params,
        });
    }

    /**
     * Gets all models that contain given hashtag value
     *
     * @param hashtagValue Hashtag value to filter models by
     * @returns Observable containing response from API
     */
    searchModelsByHashtagValue(hashtagValue: string): Observable<any> {
        const params = new HttpParams().set('hashtag_value', hashtagValue);

        return this.http.get<any>(`${environment.mainURL}/model-hashtags/search`, {
            params,
        });
    }

    /**
     * Adds hashtag to user
     *
     * @param username Username of user to add hashtag to
     * @param hashtag Hashtag to add
     * @returns Observable containing response from API
     */
    addUserHashtag(username: string, hashtag: Hashtag): Observable<any> {
        return this.http.post<any>(
            `${environment.mainURL}/users/${username}/hashtags`,
            hashtag
        );
    }

    /**
     * Deletes hashtag from user
     *
     * @param username Username of user to delete hashtag from
     * @param hashtagID Hashtag to delete
     * @returns Observable containing response from API
     */
    deleteUserHashtag(username: string, hashtagID: number): Observable<any> {
        return this.http.delete<any>(
            `${environment.mainURL}/users/${username}/hashtags/${hashtagID}`
        );
    }
}
