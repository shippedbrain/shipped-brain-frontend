import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { PasswordReset } from 'src/app/models/password-reset/password-reset';
import { User } from 'src/app/models/user/user';
import { Validation } from 'src/app/models/validation/validation';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
    user: User;
    passwordResetData: PasswordReset;
    resetToken: string;
    newPassword: string = '';
    newPasswordConfirm: string = '';
    loading: any = {
        changePassword: false,
    };
    messages: any = {
        changePassword: '',
    };
    errors: any = {
        changePassword: '',
        invalidToken: '',
    };

    constructor(private activeRoute: ActivatedRoute, private usersService: UsersService) {}

    ngOnInit(): void {
        this.activeRoute.params.subscribe((routeParams) => {
            this.resetToken = routeParams.token;

            this.validatePasswordResetToken();
        });
    }

    /**
     * Checks if reset password token in URL is valid
     */
    validatePasswordResetToken(): void {
        this.errors.invalidToken = '';

        this.usersService
            .validatePasswordResetToken(this.resetToken)
            .pipe(
                catchError((error) => {
                    this.errors.invalidToken = `
                        <span>${error.error.message}</span>
                        <div>
                            <a href="/reset-password" class="link link-magenta">Click here to request a new password</a>
                        </div>
                    `;
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.user = response.data.results.user;
                this.passwordResetData = response.data.results.password_reset_data;
            });
    }

    /**
     * Changes user password
     */
    changePassword(): void {
        if (this.validatePassword()) {
            this.usersService
                .resetPassword(this.passwordResetData.reset_token, this.newPassword)
                .pipe(
                    catchError((error) => {
                        this.errors.changePassword = error.error.message;
                        return [];
                    })
                )
                .subscribe((response: any) => {
                    this.messages.changePassword = `
                        ${response.message}
                        <div>
                            <span>Please <a href="/login" class="link link-magenta">sign in</a> using your new password</span>
                        </div>
                    `;
                });
        }
    }

    /**
     * Validates password and password confirmation inputs
     *
     * @returns true if all validations passed, otherwise false
     */
    validatePassword(): boolean {
        this.errors.changePassword = '';

        if (Validation.isStringEmpty(this.newPassword)) {
            this.errors.changePassword = 'Please enter a password';
            return false;
        }

        if (Validation.isStringEmpty(this.newPasswordConfirm)) {
            this.errors.changePassword = 'Please confirm the password';
            return false;
        }

        if (
            Validation.hasWhiteSpaces(this.newPassword) ||
            Validation.hasWhiteSpaces(this.newPasswordConfirm)
        ) {
            this.errors.changePassword = 'Password cannot contain whitespaces';
            return false;
        }

        if (
            !Validation.isPasswordLengthValid(this.newPassword) ||
            !Validation.isPasswordLengthValid(this.newPasswordConfirm)
        ) {
            this.errors.changePassword = 'Password must be at least 6 characters long';
            return false;
        }

        if (this.newPassword !== this.newPasswordConfirm) {
            this.errors.changePassword = `Passwords don't match`;
            return false;
        }

        return true;
    }

    /**
     * Toggles password input type from `password` to `text` and vice-versa
     *
     * @param event Event received when user clicks password toggle icon
     */
    showPassword(event: any): void {
        const toggleIcon = document.getElementById(event.target.id) as HTMLParagraphElement;
        const targetInput = document.getElementById(
            event.target.getAttribute('data-target')
        ) as HTMLInputElement;

        targetInput.type = targetInput.type === 'password' ? 'text' : 'password';
        toggleIcon.innerText =
            toggleIcon.innerText === 'visibility_off' ? 'visibility' : 'visibility_off';
        toggleIcon.title =
            toggleIcon.innerText === 'visibility_off' ? 'Hide Password' : 'Show Password';
    }
}
