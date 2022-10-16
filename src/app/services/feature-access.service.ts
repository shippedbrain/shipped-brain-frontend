import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FeatureAccess } from '../models/feature-access/feature-access';

@Injectable({
    providedIn: 'root',
})
export class FeatureAccessService {
    featureAccessEndpoint: string = '/feature-access';

    constructor(private http: HttpClient) {}

    /**
     * Requests access to feature
     *
     * @param featureAccess Object containing feature to request access to
     * @returns Observable containing response from API
     */
    requestFeatureAccess(featureAccess: FeatureAccess): Observable<any> {
        return this.http.post(
            `${environment.mainURL}${this.featureAccessEndpoint}`,
            featureAccess
        );
    }
}
