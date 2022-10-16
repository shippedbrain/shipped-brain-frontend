import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    errorMsg: string;
    accessToken: string;
    user: User = new User();
    loading: any = {
        signIn: false,
    };
    returnUrl: string;

    constructor(
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    }

    /**
     * Logs in user.
     *
     * When successful, user is redirected to feed or previous page
     */
    signIn(): void {
        if (this.validateFields()) {
            this.errorMsg = '';
            this.loading.signIn = true;

            this.authService
                .login(this.user)
                .pipe(finalize(() => (this.loading.signIn = false)))
                .pipe(
                    catchError((error) => {
                        this.errorMsg =
                            error.error.message ?? 'Unable to validate authentication';
                        return [];
                    })
                )
                .subscribe(() => {
                    this.authService.userLoggedIn.emit(true);
                    this.router.navigateByUrl(this.returnUrl);
                });
        }
    }

    /**
     * Validates fields required for login
     *
     * @returns true if all validations passed, otherwise false
     */
    validateFields(): boolean {
        if (!this.user.email) {
            this.errorMsg = 'Please enter a valid email';

            return false;
        }

        if (!this.user.password) {
            this.errorMsg = 'Please enter a valid password';

            return false;
        }

        return true;
    }

    /**
     * Toggles password input type from `password` to `text` and vice-versa
     */
    showPassword(): void {
        const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
        const passwordToggle = document.getElementById(
            'passwordToggle'
        ) as HTMLParagraphElement;

        passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordToggle.innerText =
            passwordToggle.innerText === 'visibility_off' ? 'visibility' : 'visibility_off';
        passwordToggle.title =
            passwordToggle.innerText === 'visibility_off' ? 'Hide Password' : 'Show Password';
    }
}
