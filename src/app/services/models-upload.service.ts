import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ModelsUploadService {
    modelUploaded: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: HttpClient) {}

    /**
     * Gets user's model uploads
     *
     * @param username Username to get uploads from
     * @param status Model upload status
     * @returns Observable containing response from API
     */
    getUserModelUploads(username: string, status: string = ''): Observable<any> {
        const params = new HttpParams().set('status', status ? status : '');

        return this.http.get<any>(`${environment.mainURL}/uploads/user/${username}`, {
            params,
        });
    }

    /**
     * Gets model upload by ID
     *
     * @param modelUploadID Model upload's ID
     * @returns Observable containing response from API
     */
    getModelUploadByID(modelUploadID: number): Observable<any> {
        return this.http.get<any>(`${environment.mainURL}/uploads/${modelUploadID}`);
    }
}
