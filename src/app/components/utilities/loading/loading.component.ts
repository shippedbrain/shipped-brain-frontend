import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
    selector: 'app-loading',
    templateUrl: './loading.component.html',
    styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {
    loading: boolean;

    constructor(private loadingService: LoadingService) {
        this.loadingService.isLoading.subscribe((isLoading: boolean) => {
            this.loading = isLoading;
        });
    }
}
