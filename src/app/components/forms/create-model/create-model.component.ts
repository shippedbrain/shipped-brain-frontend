import { Component } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { ModelTags } from 'src/app/models/model-tags/model-tags';
import { Model } from 'src/app/models/model/model';
import { MlModelsService } from 'src/app/services/ml-models.service';

@Component({
    selector: 'app-create-model',
    templateUrl: './create-model.component.html',
    styleUrls: ['./create-model.component.scss'],
})
export class CreateModelComponent {
    model: Model = new Model();
    loading = {
        createModel: false,
    };
    successMsgs = {
        createModel: '',
    };
    errorMsgs = {
        createModel: '',
    };

    constructor(private modelsService: MlModelsService) {}

    /**
     * Creates model if form fields validations pass
     */
    createModel(): void {
        if (this.validateCreateModelFields()) {
            this.loading.createModel = true;

            this.modelsService
                .createModel(this.model)
                .pipe(finalize(() => (this.loading.createModel = false)))
                .pipe(
                    catchError((error: any) => {
                        this.errorMsgs.createModel =
                            error.error.message ?? 'Unable to create model';
                        return [];
                    })
                )
                .subscribe((response: any) => {
                    this.successMsgs.createModel = 'Successfully created model';
                });
        }
    }

    /**
     * Validates form fields
     *
     * @returns true if all fields validations pass, else false
     */
    validateCreateModelFields(): boolean {
        this.successMsgs.createModel = this.errorMsgs.createModel = '';

        if (!this.model.name) {
            this.errorMsgs.createModel = 'Please enter a model name';
            return false;
        }

        if (this.model.github_repo && !ModelTags.isGitHubUrlValid(this.model.github_repo)) {
            this.errorMsgs.createModel =
                'GitHub repository URL is invalid. URL should look something like: github.com/github_username/github_project';
            return false;
        }

        return true;
    }
}
