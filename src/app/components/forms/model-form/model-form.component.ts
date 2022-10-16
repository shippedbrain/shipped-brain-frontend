import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { Hashtag } from 'src/app/models/hashtag/hashtag';
import { ModelSignature } from 'src/app/models/model-signature/model-signature';
import { ModelTags } from 'src/app/models/model-tags/model-tags';
import { Model } from 'src/app/models/model/model';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { HashtagService } from 'src/app/services/hashtag.service';
import { MlModelsService } from 'src/app/services/ml-models.service';

@Component({
    selector: 'app-model-form',
    templateUrl: './model-form.component.html',
    styleUrls: ['./model-form.component.scss'],
})
export class ModelFormComponent implements OnInit {
    modelName: string;
    modelVersion: number = 0;
    model: Model;
    updateSuccess: boolean = false;
    modelCategories: Hashtag[];
    modelHashtags: Hashtag[];
    successMsgs: any = {
        model: '',
        hashtag: '',
        uploadImage: '',
    };
    errorMsgs: any = {
        model: '',
        hashtag: '',
        uploadImage: '',
    };
    newHashtag: string;
    modelMetrics: string;
    modelParameters: string;
    modelInputExample: string;
    modelSignature: string;
    loading = {
        updateModel: false,
        addHashtag: false,
        uploadImage: false,
    };
    modelCoverPhoto: any;

    constructor(
        private activeRoute: ActivatedRoute,
        private router: Router,
        private modelsService: MlModelsService,
        private hashtagsService: HashtagService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.modelName = this.activeRoute.snapshot.paramMap.get('modelname');
        this.getModel();
    }

    /**
     * Gets model
     */
    getModel(): void {
        if (this.modelName) {
            this.modelsService
                .getRegisteredModel(this.modelName, 'short')
                .pipe(
                    catchError((error: any) => {
                        this.errorMsgs.model =
                            error.error.message ??
                            'Looks like the model you tried to access was not found!';
                        return [];
                    })
                )
                .subscribe((response: any) => {
                    this.model = response.data.results;
                    this.modelCoverPhoto = this.model.cover_photo;

                    this.checkUserPermission();
                    this.parseModelDataToString();
                    this.getHashtags();
                });
        }
    }

    /**
     * Gets current user to check if user is the model owner. If not, user is redirected to feed
     */
    checkUserPermission(): void {
        this.authService
            .getCurrentUser()
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                const currentUser: User = response.data.results;

                // Check if model belongs to current user; if not, redirect to feed
                if (currentUser.username !== this.model.user.username) {
                    this.router.navigateByUrl(`/`);
                }
            });
    }

    /**
     * Gets category hashtags
     */
    getHashtags(): void {
        this.hashtagsService
            .getHashtags('category')
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.modelCategories = response.data.results.categories;
                this.setActiveHashtags();
            });
    }

    /**
     * Parses model data.
     * Shortcut method to call all of model's parsing methods:
     * (metrics, parameters, input example and signature)
     */
    parseModelDataToString(): void {
        this.parseModelMetricsToString();
        this.parseModelParametersToString();
        this.parseModelInputExampleToString();
        this.parseModelSignatureToString();
    }

    /**
     * Parses model's metrics from object to string
     */
    parseModelMetricsToString(): void {
        if (this.model.metrics) {
            try {
                this.modelMetrics = JSON.stringify(this.model.metrics, null, 4);
            } catch (error) {
                this.modelMetrics = JSON.stringify(JSON.parse(this.model.metrics), null, 4);
            }
        }
    }

    /**
     * Parses model's parameters from object to string
     */
    parseModelParametersToString(): void {
        if (this.model.parameters) {
            try {
                this.modelParameters = JSON.stringify(this.model.parameters, null, 4);
            } catch (error) {
                this.modelParameters = JSON.stringify(
                    JSON.parse(this.model.parameters as string),
                    null,
                    4
                );
            }
        }
    }

    /**
     * Parses model's input example from object to string
     */
    parseModelInputExampleToString(): void {
        if (this.model.input_example) {
            try {
                this.modelInputExample = JSON.stringify(
                    JSON.parse(this.model.input_example),
                    null,
                    4
                );
            } catch (error) {
                this.modelInputExample = JSON.stringify(this.model.input_example, null, 4);
            }
        }
    }

    /**
     * Parses model's signature from object to string
     */
    parseModelSignatureToString(): void {
        let enteredLastCatch: boolean = false;

        if (this.model.signature) {
            try {
                this.model.signature = {
                    inputs: JSON.parse((this.model.signature as ModelSignature).inputs),
                    outputs: JSON.parse((this.model.signature as ModelSignature).outputs),
                };
            } catch (error) {
                try {
                    this.model.signature = {
                        inputs: JSON.parse(
                            (JSON.parse(this.model.signature as string) as ModelSignature)
                                .inputs
                        ),
                        outputs: JSON.parse(
                            (JSON.parse(this.model.signature as string) as ModelSignature)
                                .outputs
                        ),
                    };
                } catch (error) {
                    try {
                        this.model.signature = {
                            inputs: JSON.parse(this.model.signature as string).inputs,
                            outputs: JSON.parse(this.model.signature as string).outputs,
                        };
                    } catch (error) {
                        enteredLastCatch = true;
                        this.modelSignature = JSON.stringify(this.model.signature, null, 4);
                    }
                }
            }

            if (!enteredLastCatch) {
                this.modelSignature = JSON.stringify(this.model.signature, null, 4);
            }
        }
    }

    /**
     * Converts model's data (metrics, parameters, input_example and signature) from string to object
     */
    parseModelDataToJson(): void {
        this.model.metrics = this.modelMetrics ? JSON.parse(this.modelMetrics) : '';
        this.model.parameters = this.modelParameters ? JSON.parse(this.modelParameters) : '';
        this.model.input_example = this.modelInputExample
            ? JSON.parse(this.modelInputExample)
            : '';
        this.model.signature = this.modelSignature ? JSON.parse(this.modelSignature) : '';
    }

    /**
     * Sets model's active hashtags
     */
    setActiveHashtags(): void {
        if (this.modelCategories && this.model.hashtags) {
            this.modelCategories.forEach((hashtag) => {
                if (
                    this.model.hashtags.find((modelHashtag) => modelHashtag.id === hashtag.id)
                ) {
                    hashtag.active = true;
                }
            });
        }

        if (this.model.hashtags) {
            this.modelHashtags = this.model.hashtags.filter(
                (hashtag) => hashtag.key === 'hashtag'
            );
        }
    }

    /**
     * Updates model category and validates if category should be added or deleted
     *
     * @param category Category to update
     */
    updateModelCategory(category: Hashtag): void {
        this.errorMsgs.hashtag = this.successMsgs.hashtag = '';
        if (this.countChosenCategories() < 2 || category.active) {
            if (category.active) {
                // Delete
                this.deleteHashtag(category.id);
            } else {
                // Add
                this.addHashtag(category.id);
            }
        } else {
            this.errorMsgs.hashtag = 'You can only choose up to 2 categories';
        }
    }

    /**
     * Adds hashtag to model.
     * If hashtag ID doesn't exist, a new one is created
     *
     * @param hashtagID Hashtag ID
     */
    addHashtag(hashtagID: number = 0): void {
        this.errorMsgs.hashtag = this.successMsgs.hashtag = '';
        let hashtag: Hashtag = new Hashtag();

        this.loading.addHashtag = true;

        if (hashtagID === 0) {
            if (this.modelHashtags.length < 3) {
                hashtag.key = 'hashtag';
                hashtag.value = this.newHashtag;
            } else {
                this.errorMsgs.hashtag = 'You can only add up to 3 hashtags';
            }
        } else {
            hashtag = this.modelCategories.find((category) => category.id === hashtagID);
        }

        this.hashtagsService
            .addModelHashtag(this.model.name, hashtag)
            .pipe(finalize(() => (this.loading.addHashtag = false)))
            .pipe(
                catchError(() => {
                    this.errorMsgs.hashtag = 'An error ocurred while updating model';
                    return [];
                })
            )
            .subscribe(() => {
                if (hashtagID > 0) {
                    this.modelCategories.find((category) => category.id === hashtagID).active =
                        true;
                }

                this.newHashtag = '';
                this.successMsgs.hashtag = 'Successfully updated model';
                this.getModel();
            });
    }

    /**
     * Deletes hashtag from model
     *
     * @param hashtagID Hashtag to delete
     */
    deleteHashtag(hashtagID: number): void {
        this.errorMsgs.hashtag = this.successMsgs.hashtag = '';

        this.hashtagsService
            .deleteModelHashtag(this.model.name, hashtagID)
            .pipe(
                catchError((error) => {
                    this.errorMsgs.hashtag =
                        error.error.message ?? 'An error ocurred while updating model';
                    return [];
                })
            )
            .subscribe(() => {
                this.successMsgs.hashtag = 'Successfully updated model';
                this.getModel();
            });
    }

    /**
     * Returns number of model's chosen categories.
     *
     * @returns number of model's categories
     */
    countChosenCategories(): number {
        return this.modelCategories.filter((model) => model.active).length;
    }

    /**
     * Updates model data.
     * Calls validateModelFields method and if it returns true model is updated
     */
    updateModel(): void {
        if (this.validateModelFields()) {
            this.updateSuccess = false;
            this.errorMsgs.model = this.successMsgs.model = '';
            this.loading.updateModel = true;

            this.parseModelDataToJson();

            this.modelsService
                .updateModel(this.model)
                .pipe(finalize(() => (this.loading.updateModel = false)))
                .pipe(
                    catchError((error) => {
                        this.errorMsgs.model = error.error.message ?? 'Unable to update model';
                        return [];
                    })
                )
                .subscribe(() => {
                    this.parseModelDataToString();
                    this.successMsgs.model = 'Updated model successfully';
                    this.updateSuccess = true;
                });
        }
    }

    /**
     * Validates data from inputs and returns true if all validations pass.
     * When a validation fails an error message is shown and method returns false
     *
     * @returns true if validations pass, else false
     */
    validateModelFields(): boolean {
        if (this.model.github_repo && !ModelTags.isGitHubUrlValid(this.model.github_repo)) {
            this.errorMsgs.model =
                'GitHub repository URL is invalid. URL should look something like: github.com/github_username/github_project';
            return false;
        }

        if (this.modelMetrics && !ModelTags.areMetricsValid(this.modelMetrics)) {
            this.errorMsgs.model = 'Metrics are invalid. Please enter a valid JSON object.';
            return false;
        }

        if (this.modelParameters && !ModelTags.areParamsValid(this.modelParameters)) {
            this.errorMsgs.model = 'Parameters are invalid. Please enter a valid JSON object.';
            return false;
        }

        if (this.modelInputExample && !ModelTags.isInputExampleValid(this.modelInputExample)) {
            this.errorMsgs.model =
                'Input example is invalid. Please enter a valid JSON object.';
            return false;
        }

        if (this.modelSignature && !ModelTags.isSignatureValid(this.modelSignature)) {
            this.errorMsgs.model = 'Signature is invalid. Please enter a valid JSON object.';
            return false;
        }

        return true;
    }

    /**
     * Uploads model's cover photo
     *
     * @param event Event containing selected file
     */
    uploadImage(event: any): void {
        this.loading.uploadImage = true;
        this.successMsgs.uploadImage = this.errorMsgs.uploadImage = '';

        this.previewImage(event.target.files[0]);

        this.modelsService
            .uploadModelCoverPhoto(this.model, event.target.files[0])
            .pipe(finalize(() => (this.loading.uploadImage = false)))
            .pipe(
                catchError((error) => {
                    this.errorMsgs.uploadImage =
                        error.error.message ?? 'An error occurred while uploading cover photo';
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.successMsgs.uploadImage = response.message;
            });
    }

    /**
     * Converts file parameter to base64 image to show its preview
     *
     * @param file Image file to convert
     */
    previewImage(file: Blob): void {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
            this.modelCoverPhoto = reader.result;
        };
    }
}
