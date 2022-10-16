import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userLoggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: HttpClient) {}

    /**
     * Attempts to authenticates user and when successful calls setSession with JWT returned
     *
     * @param user User data
     * @returns Token with user data
     */
    login(user: User): Observable<User> {
        return this.http
            .post<User>(`${environment.mainURL}/login`, user)
            .pipe(tap((response: any) => this.setSession(response.data.results)))
            .pipe(shareReplay());
    }

    /**
     * Gets data from logged in user
     *
     * @returns User data
     */
    getCurrentUser(): Observable<User> {
        return this.http.get<User>(`${environment.mainURL}/users/me`);
    }

    /**
     * Logs out user deleting data from localStorage
     */
    logout(): void {
        localStorage.removeItem('sb_connect');
        localStorage.removeItem('sb_connect_expires');
    }

    /**
     * Checks if users is logged in.
     *
     * @returns true if user is logged in, otherwise false and calls logout method
     */
    isLoggedIn(): boolean {
        if (moment().isBefore(this.getExpiration())) {
            return true;
        }

        this.logout();

        return false;
    }

    /**
     * Gets date saved in localStorage containing JWT's expiration time
     *
     * @returns moment object containing expiration date
     */
    getExpiration(): moment.Moment {
        const expiration = localStorage.getItem('sb_connect_expires');
        const expiresAt = JSON.parse(expiration);

        return moment.unix(expiresAt);
    }

    /**
     * Gets user's JWT token
     *
     * @returns JWT token
     */
    getUserToken(): string {
        const token = localStorage.getItem('sb_connect');

        return token ? token : '<user_token>';
    }

    /**
     * Saves JWT data in localStorage
     *
     * @param authResult Object containing access token and its expiration date
     */
    private setSession(authResult: any): void {
        localStorage.setItem('sb_connect', authResult.access_token);
        localStorage.setItem('sb_connect_expires', authResult.expires);
    }
}
