import { AfterContentInit, AfterViewChecked, Component, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';
import { catchError, startWith, switchMap } from 'rxjs/operators';
import {
    ModelUpload,
    MODEL_UPLOAD_FAILED,
    MODEL_UPLOAD_FINISHED,
    MODEL_UPLOAD_RUNNING,
} from './models/model-upload/model-upload';
import { User } from './models/user/user';
import { AuthService } from './services/auth.service';
import { ModelsUploadService } from './services/models-upload.service';

declare const PR: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterContentInit, AfterViewChecked, OnDestroy {
    title = 'shipped-brain';
    fullpageRoutes: string[] = ['/early-access', '/login', '/register', '/reset-password'];
    dashboardRoute: string = '/dashboard';
    feedRoute: string = '/';
    isFullpage: boolean;
    isDashboard: boolean;
    isFeed: boolean;
    currentUser: User = new User();
    timeInterval: Subscription;
    hasRunningUploads: boolean;
    uploadsRunning: any[] = [];
    lastModelUpload: ModelUpload;

    constructor(
        private router: Router,
        private authService: AuthService,
        private modelsUploadService: ModelsUploadService,
        private toastrService: ToastrService
    ) {}

    ngAfterContentInit(): void {
        this.checkRoutes();

        // Check if user is authenticated
        if (this.authService.getUserToken() !== '<user_token>') {
            this.getCurrentUser();
        }

        this.modelsUploadService.modelUploaded.subscribe((wasUploaded: boolean) => {
            this.getModelUploadedEvent(wasUploaded);
        });
    }

    ngAfterViewChecked(): void {
        PR.prettyPrint();
    }

    ngOnDestroy(): void {
        this.timeInterval.unsubscribe();
        document.body.classList.remove('fullpage');
    }

    /**
     * Gets current route to run validations
     */
    checkRoutes(): void {
        this.router.events.subscribe((route: any) => {
            if (route instanceof NavigationEnd) {
                this.checkFullPageRoutes(route.url);
                this.checkIfIsDashboard(route.url);
                this.checkIfIsFeed(route.url);
            }
        });
    }

    /**
     * Validates if header and footer should be shown in the current route
     *
     * @param currentRoute The current route
     */
    checkFullPageRoutes(currentRoute: string): void {
        if (
            this.fullpageRoutes.find(
                (route) => route === currentRoute || currentRoute.startsWith(route)
            )
        ) {
            this.isFullpage = true;
            document.body.classList.add('fullpage');
        } else {
            this.isFullpage = false;
            document.body.classList.remove('fullpage');
        }
    }

    /**
     * Validates if current route belongs to the dashboard
     *
     * @param currentRoute The current route
     */
    checkIfIsDashboard(currentRoute: string): void {
        this.isDashboard = currentRoute.startsWith(this.dashboardRoute);
    }

    /**
     * Validates if current route is feed
     *
     * @param currentRoute The current route
     *
     */
    checkIfIsFeed(currentRoute: string): void {
        this.isFeed = currentRoute === this.feedRoute || currentRoute.startsWith('/?');
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

                // If current user exists it checks for pending uploads
                if (this.currentUser) {
                    this.checkRunningUploads();
                }
            });
    }

    /**
     * Receives event when user starts uploading a model to force checking for running uploads
     *
     * @param event Value received when model upload event is emitted
     */
    getModelUploadedEvent(event: boolean): void {
        if (event) {
            this.toastrService.success('Model is uploading', '', {
                disableTimeOut: true,
                closeButton: true,
            });
            this.checkRunningUploads();
        }
    }

    /**
     * Checks if user has uploads running. If true method will keep running to check status
     */
    checkRunningUploads(): void {
        this.timeInterval = interval(60000) // 60000ms = 1 minute
            .pipe(
                startWith(0),
                switchMap(() =>
                    this.modelsUploadService.getUserModelUploads(
                        this.currentUser.username,
                        MODEL_UPLOAD_RUNNING
                    )
                )
            )
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.uploadsRunning = response.data.results;

                // If no running uploads are found, subscription is ended so method doesn't keep running
                if (!this.uploadsRunning || this.uploadsRunning.length === 0) {
                    // If condition below returns true it means user had models running and they've finished uploading
                    if (this.hasRunningUploads) {
                        this.getLatestModelUpload();
                    }

                    this.timeInterval.unsubscribe();
                } else {
                    if (!this.hasRunningUploads) {
                        this.hasRunningUploads = true;
                        this.lastModelUpload = this.uploadsRunning[0];
                    }
                }
            });
    }

    /**
     * Get latest model upload to check its status
     */
    getLatestModelUpload(): void {
        this.modelsUploadService
            .getModelUploadByID(this.lastModelUpload.id)
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                const status = response.data.results.status;

                if (status === MODEL_UPLOAD_FINISHED) {
                    this.toastrService.success('Model upload completed', '', {
                        disableTimeOut: true,
                        closeButton: true,
                    });
                } else if (status === MODEL_UPLOAD_FAILED) {
                    this.toastrService.error('Model upload failed', '', {
                        disableTimeOut: true,
                        closeButton: true,
                    });
                }
            });
    }
}
