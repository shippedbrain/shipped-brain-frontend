import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MlModelsService } from 'src/app/services/ml-models.service';
import { ModelsUploadService } from 'src/app/services/models-upload.service';

@Component({
    selector: 'app-model-upload',
    templateUrl: './model-upload.component.html',
    styleUrls: ['./model-upload.component.scss'],
})
export class ModelUploadComponent implements OnInit {
    uploadSuccess: boolean = false;
    errorMsg: string;
    successMsg: string;
    fileUpload: File;
    modelDescription: string;
    loading: any = {
        modelUpload: false,
    };

    constructor(
        private modelsService: MlModelsService,
        private authService: AuthService,
        private modelsUploadService: ModelsUploadService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (!this.authService.isLoggedIn()) {
            this.router.navigateByUrl('/login');
        }
    }

    /**
     * Posts uploaded file to API to create new model
     */
    uploadModel(): void {
        this.uploadSuccess = false;
        this.errorMsg = this.successMsg = '';

        if (this.validateUpload()) {
            this.loading.modelUpload = true;

            this.modelsService
                .uploadModel(this.fileUpload, this.modelDescription)
                .pipe(finalize(() => (this.loading.modelUpload = false)))
                .pipe(
                    catchError((error) => {
                        this.errorMsg =
                            error.error.message ?? 'There was an error uploading your model';
                        return [];
                    })
                )
                .subscribe(() => {
                    this.fileUpload = null;
                    this.uploadSuccess = true;

                    this.setUploadSuccessMsg();
                    this.modelsUploadService.modelUploaded.emit(true);
                });
        }
    }

    /**
     * Set message for when user successfully uploads a model
     */
    setUploadSuccessMsg(): void {
        this.successMsg = `
            <span>Thank you, your model is being uploaded!
                <br>
                This will take a few minutes. You can continue exploring Shipped Brain while your model is being deployed. We'll notify you when it's done.
            </span>`;
    }

    /**
     * Receives change event from file upload input
     *
     * @param files Uploaded files
     */
    changedFile(files: FileList): void {
        if (files[0]) {
            this.fileUpload = files[0];
        }
    }

    /**
     * Validates model upload (zip file and description)
     *
     * @returns true if zip file was uploaded and model description is not empty, otherwise false
     */
    validateUpload(): boolean {
        if (!this.fileUpload) {
            // Check if file was uploaded
            this.errorMsg = 'Please upload a valid zip file';
            return false;
        } else if (!this.modelDescription) {
            // Check if user wrote a model description
            this.errorMsg = 'Please enter a model description';
            return false;
        }

        return true;
    }
}
