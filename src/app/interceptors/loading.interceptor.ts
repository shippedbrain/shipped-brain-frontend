import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable({
    providedIn: 'root',
})
export class LoadingInterceptor {
    private requests: HttpRequest<any>[] = [];

    constructor(private loadingService: LoadingService) {}

    /**
     * Removes request from list of requests. Sets LoadingService's isLoading subject to true if list of requests' length is greater than 0
     *
     * @param request HTTP request
     */
    removeRequest(request: HttpRequest<any>) {
        const requestIndex = this.requests.indexOf(request);

        if (requestIndex >= 0) {
            this.requests.splice(requestIndex, 1);
        }

        this.loadingService.isLoading.next(this.requests.length > 0);
    }

    /**
     * Interceptor is used to set LoadingService's isLoading subject to true while an HTTP request is ongoing
     *
     * @param request HTTP request
     * @param next HTTP response
     * @returns HTTP response's observable
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.requests.push(request);

        this.loadingService.isLoading.next(true);

        return new Observable((observer) => {
            const subscription = next.handle(request).subscribe(
                (event) => {
                    if (event instanceof HttpResponse) {
                        this.removeRequest(request);
                        observer.next(event);
                    }
                },
                (error) => {
                    this.removeRequest(request);
                    observer.error(error);
                },
                () => {
                    this.removeRequest(request);
                    observer.complete();
                }
            );

            return () => {
                this.removeRequest(request);
                subscription.unsubscribe();
            };
        });
    }
}
