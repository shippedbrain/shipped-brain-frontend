import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { ModelRequest } from 'src/app/models/model-request/model-request';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { ModelRequestsService } from 'src/app/services/model-requests.service';

@Component({
    selector: 'app-model-request-form',
    templateUrl: './model-request-form.component.html',
    styleUrls: ['./model-request-form.component.scss'],
})
export class ModelRequestFormComponent implements OnInit {
    user: User;
    modelRequest: ModelRequest = new ModelRequest();
    errors: any = {
        createModelRequest: '',
    };
    messages: any = {
        createModelRequest: '',
    };
    loading: any = {
        createModelRequest: false,
    };

    constructor(
        private authService: AuthService,
        private modelRequestService: ModelRequestsService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.validateAuth();
    }

    /**
     * Checks if user is logged in; if not user will be redirected to login page
     */
    validateAuth(): void {
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/login');
        }

        this.getUser();
    }

    /**
     * Gets current logged in user
     */
    getUser(): void {
        this.authService
            .getCurrentUser()
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.user = response.data.results;

                // NOT USED: Checks if user can request model
                // if (!this.user.user_limits.can_request_model) {
                //     this.router.navigateByUrl('/access/model-request')
                // }
            });
    }

    /**
     * Saves model request
     */
    saveModelRequest(): void {
        if (this.validateModelRequest()) {
            this.loading.createModelRequest = true;

            this.modelRequestService
                .saveModelRequest(this.modelRequest)
                .pipe(finalize(() => (this.loading.createModelRequest = false)))
                .pipe(
                    catchError((error: any) => {
                        this.errors.createModelRequest = error.error.message;
                        return [];
                    })
                )
                .subscribe((response: any) => {
                    this.messages.createModelRequest = response.message;
                    this.errors.createModelRequest = '';
                    this.modelRequest = new ModelRequest();
                });
        }
    }

    /**
     * Validates model request's required fields
     *
     * @returns true if all required fields are filled, otherwise false
     */
    validateModelRequest(): boolean {
        this.messages.createModelRequest = '';

        if (!this.modelRequest.title) {
            this.errors.createModelRequest = 'Please provide a title for your model request';
            return false;
        }
        if (!this.modelRequest.description) {
            this.errors.createModelRequest =
                'Please provide a description for your model request';
            return false;
        }

        return true;
    }
}
