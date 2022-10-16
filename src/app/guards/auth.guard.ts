import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) {}

    /**
     * Validates if user is logged in. When false, user is redirected to login page
     *
     * @param route Route information
     * @param state State of the router
     * @returns true if user is logged in, otherwise false
     */
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (route.routeConfig.path === 'login') {
            if (this.authService.isLoggedIn()) {
                this.router.navigate(['/']);
            }

            return true;
        }

        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['login'], {
                queryParams: { returnUrl: state.url },
            });

            return false;
        }

        return true;
    }
}
