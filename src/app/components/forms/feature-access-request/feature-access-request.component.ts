import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { FeatureAccess } from 'src/app/models/feature-access/feature-access';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { FeatureAccessService } from 'src/app/services/feature-access.service';

@Component({
    selector: 'app-feature-access-request',
    templateUrl: './feature-access-request.component.html',
    styleUrls: ['./feature-access-request.component.scss'],
})
export class FeatureAccessRequestComponent implements OnInit {
    requestedFeature: string = '';
    requestedFeatureFriendlyName: string = '';
    featureAccess: FeatureAccess = new FeatureAccess();
    loading: any = {
        submitRequest: false,
    };
    errors: any = {
        submitRequest: '',
    };
    messages: any = {
        submitRequest: '',
    };
    currentUser: User = new User();

    constructor(
        private route: ActivatedRoute,
        private featureAccessService: FeatureAccessService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((routerParams) => {
            this.requestedFeature = routerParams.feature;
        });

        if (this.requestedFeature) {
            this.featureAccess.request_type = this.requestedFeature;
            this.getFeatureFriendlyName();
            this.getCurrentUser();
        }
    }

    /**
     * Gets current user
     */
    getCurrentUser(): void {
        this.authService
            .getCurrentUser()
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.currentUser = response.data.results;
            });
    }

    /**
     * Gets friendly name for requested feature. Eg: *deploy* to *deployment*
     */
    getFeatureFriendlyName(): void {
        switch (this.requestedFeature) {
            case 'deploy':
                this.requestedFeatureFriendlyName = 'deployment';
                break;
            case 'dashboard':
                this.requestedFeatureFriendlyName = 'complete dashboard';
                break;
            case 'model-request':
                this.requestedFeatureFriendlyName = 'model request';
                break;
        }
    }

    /**
     * Submits feature access request
     */
    submitRequest(): void {
        this.messages.submitRequest = '';
        this.errors.submitRequest = '';
        this.loading.submitRequest = true;

        this.featureAccessService
            .requestFeatureAccess(this.featureAccess)
            .pipe(finalize(() => (this.loading.submitRequest = false)))
            .pipe(
                catchError((error: any) => {
                    this.errors.submitRequest =
                        error.error.message ??
                        'An error occurred while submitting your request';
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.messages.submitRequest = response.message;
            });
    }
}
