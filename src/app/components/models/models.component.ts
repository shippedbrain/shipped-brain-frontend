import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Model } from 'src/app/models/model/model';
import { MlModelsService } from 'src/app/services/ml-models.service';

@Component({
    selector: 'app-models',
    templateUrl: './models.component.html',
    styleUrls: ['./models.component.scss'],
})
export class ModelsComponent implements OnInit {
    models: Model[] = [];
    loading: any = {
        models: false,
    };
    noModelsMessage: string = `
        <p>Looks like there are no models to show yet!</p>
        <a href="/deploy" class="link color-magenta">Why don't you show us some of yours?</a>
    `;

    constructor(private modelsService: MlModelsService) {}

    ngOnInit(): void {
        this.getModels();
    }

    /**
     * Gets models
     */
    getModels(): void {
        this.loading.models = true;

        this.modelsService
            .getRegisteredModels()
            .pipe(finalize(() => (this.loading.models = false)))
            .subscribe((response: any) => {
                this.models = response.data.results;
            });
    }
}
