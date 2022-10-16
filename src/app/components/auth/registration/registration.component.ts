import { Component } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { User } from 'src/app/models/user/user';
import { Validation } from 'src/app/models/validation/validation';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
    createdAccount: boolean = false;
    errorMsg: string;
    user: User = new User();
    loading: any = {
        registration: false,
    };

    constructor(private usersService: UsersService) {}

    /**
     * Creates a new user
     */
    createUser(): void {
        if (this.validateFields()) {
            this.errorMsg = '';
            this.loading.registration = true;

            this.usersService
                .createUser(this.user)
                .pipe(finalize(() => (this.loading.registration = false)))
                .pipe(
                    catchError((error) => {
                        this.errorMsg =
                            error.error.message ??
                            'An error ocurred while creating your new account';

                        return [];
                    })
                )
                .subscribe((response: any) => {
                    this.createdAccount = true;
                });
        }
    }

    /**
     * Validates fields required for account creation
     *
     * @returns true if all validations passed, otherwise false
     */
    validateFields(): boolean {
        if (!this.user.name) {
            this.errorMsg = 'Please enter a valid name';
            return false;
        }

        if (!this.user.username) {
            this.errorMsg = 'Please enter a valid username';
            return false;
        }

        if (Validation.hasWhiteSpaces(this.user.username)) {
            this.errorMsg = 'Username cannot contain whitespaces';
            return false;
        }

        if (!this.user.email || !Validation.isEmailValid(this.user.email)) {
            this.errorMsg = 'Please enter a valid email';
            return false;
        }

        if (Validation.hasWhiteSpaces(this.user.email)) {
            this.errorMsg = 'Email cannot contain whitespaces';
            return false;
        }

        if (!this.user.password) {
            this.errorMsg = 'Please enter a valid password';
            return false;
        }

        if (Validation.hasWhiteSpaces(this.user.password)) {
            this.errorMsg = 'Password cannot contain whitespaces';
            return false;
        }

        if (this.user.password.length < 6) {
            this.errorMsg = 'Password must be at least 6 characters long';
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
