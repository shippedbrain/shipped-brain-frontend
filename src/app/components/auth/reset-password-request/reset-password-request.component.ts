import { Component } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-reset-password-request',
    templateUrl: './reset-password-request.component.html',
    styleUrls: ['./reset-password-request.component.scss'],
})
export class ResetPasswordRequestComponent {
    email: string;
    loading: any = {
        resetPassword: false,
    };
    messages: any = {
        resetPassword: '',
    };
    errors: any = {
        resetPassword: '',
    };

    constructor(private usersService: UsersService) {}

    /**
     * Creates a new password reset request
     *
     * @param resent Parameter indicates if user asked for password reset email to be resent
     */
    resetPassword(resent: boolean = false): void {
        if (this.validateEmailAddress()) {
            this.loading.resetPassword = true;
            this.errors.resetPassword = false;
            this.messages.resetPassword = '';

            this.usersService
                .requestResetPassword(this.email)
                .pipe(finalize(() => (this.loading.resetPassword = false)))
                .pipe(
                    catchError((error) => {
                        this.errors.resetPassword =
                            error.status === 422
                                ? 'An error ocurred while processing your request. Please try again later!'
                                : error.error.message;
                        return [];
                    })
                )
                .subscribe((response: any) => {
                    if (resent) {
                        this.messages.resetPassword = 'Email resent.\n';
                    }

                    this.messages.resetPassword += response.message;
                });
        } else {
            this.errors.resetPassword = 'Please enter a valid email address';
        }
    }

    /**
     * Checks if email input is empty
     *
     * @returns true if validation passes, otherwise false
     */
    validateEmailAddress(): boolean {
        return this.email ? true : false;
    }
}
