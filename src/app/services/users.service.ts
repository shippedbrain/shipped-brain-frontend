import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user/user';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    photoChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    usersEndpoint: string = '/users';
    countEndpoint: string = '/count';
    meEndpoint: string = '/me';
    resetPasswordEndpoint: string = '/reset-password';
    modelUsageEndpoint: string = '/model-usage';
    apiCallsEndpoint: string = '/api-calls';

    constructor(private http: HttpClient) {}

    /**
     * Gets paginated users with optional filters
     *
     * @param searchQuery Search query to filter users by
     * @param pageNumber Page number to retrieve
     * @param resultsPerPage Max number of results to retrieve
     * @returns Observable containing response from API
     */
    getUsers(
        searchQuery: string = '',
        pageNumber: number = 1,
        resultsPerPage: number = 10
    ): Observable<User[]> {
        const params = new HttpParams()
            .set('search_query', searchQuery)
            .set('page_number', pageNumber.toString())
            .set('results_per_page', resultsPerPage.toString());

        return this.http.get<User[]>(`${environment.mainURL}${this.usersEndpoint}`, {
            params,
        });
    }

    /**
     * Gets user by username
     *
     * @param username Username of user to retrieve
     * @returns Observable containing response from API
     */
    getUser(username: string): Observable<User> {
        return this.http.get<User>(`${environment.mainURL}${this.usersEndpoint}/${username}`);
    }

    /**
     * Creates user
     *
     * @param user User data
     * @returns Observable containing response from API
     */
    createUser(user: User): Observable<any> {
        return this.http.post<any>(`${environment.mainURL}${this.usersEndpoint}`, user);
    }

    /**
     * Requests a new password reset for user with given email
     *
     * @param email User's email
     * @returns Observable containing response from API
     */
    requestResetPassword(email: string): Observable<any> {
        return this.http.post<any>(`${environment.mainURL}${this.resetPasswordEndpoint}`, {
            user_email: email,
        });
    }

    /**
     * Checks if given password reset token is valid
     *
     * @param token Token to validate
     * @returns Observable containing response from API
     */
    validatePasswordResetToken(token: string): Observable<any> {
        return this.http.get<any>(
            `${environment.mainURL}${this.resetPasswordEndpoint}/${token}`
        );
    }

    /**
     * Resets password for user with given reset token
     *
     * @param resetToken User's password reset token
     * @param newPassword User's new password
     * @returns Observable containing response from API
     */
    resetPassword(resetToken: string, newPassword: string): Observable<any> {
        const data = {
            password: newPassword,
        };

        return this.http.post<any>(
            `${environment.mainURL}${this.resetPasswordEndpoint}/${resetToken}`,
            data
        );
    }

    /**
     * Updates user's data
     *
     * @param user User to update
     * @returns Observable containing response from API
     */
    updateUser(user: User): Observable<any> {
        delete user.models;

        return this.http.put<any>(
            `${environment.mainURL}${this.usersEndpoint}/${user.username}`,
            user
        );
    }

    /**
     * Changes user's password
     *
     * @param user Object containing user's data, including username, password and password confirmation
     * @returns Observable containing response from API
     */
    updatePassword(user: User): Observable<any> {
        const data = {
            new_password: user.new_password,
            new_password_confirm: user.new_password_confirm,
        };

        return this.http.put<any>(
            `${environment.mainURL}${this.usersEndpoint}/${user.username}/password`,
            data
        );
    }

    /**
     * Gets model usage of current user
     *
     * @returns Observable containing response from API
     */
    getModelUsageByUser(): Observable<any> {
        return this.http.get<any>(
            `${environment.mainURL}${this.usersEndpoint}${this.meEndpoint}${this.modelUsageEndpoint}`
        );
    }

    /**
     * Gets API calls of current user
     *
     * @returns Observable containing response from API
     */
    getAPICallsByUser(): Observable<any> {
        return this.http.get<any>(
            `${environment.mainURL}${this.usersEndpoint}${this.meEndpoint}${this.apiCallsEndpoint}`
        );
    }

    /**
     * Add photo to user
     *
     * @param user User to add photo to
     * @param photo File object containing photo
     * @returns Observable containing response from API
     */
    uploadPhoto(user: User, photo: File): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('photo', photo);

        return this.http.post<any>(
            `${environment.mainURL}${this.usersEndpoint}/${user.username}/photo`,
            formData
        );
    }
}
