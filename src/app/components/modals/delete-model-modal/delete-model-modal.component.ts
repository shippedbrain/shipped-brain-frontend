import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Model } from 'src/app/models/model/model';
import { MlModelsService } from 'src/app/services/ml-models.service';

@Component({
    selector: 'app-delete-model-modal',
    templateUrl: './delete-model-modal.component.html',
    styleUrls: ['./delete-model-modal.component.scss'],
})
export class DeleteModelModalComponent implements OnInit {
    @Input() model: Model;
    @Output() deletedModelVersion: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private modelsService: MlModelsService, private renderer: Renderer2) {}

    ngOnInit(): void {
        const modal = document.getElementById('modalDeleteModelVersion');

        window.onclick = (event: Event) => {
            if (event.target === modal) {
                this.closeModal();
            }
        };
    }

    /**
     * Closes modal popup
     */
    closeModal(): void {
        const modal = document.getElementById('modalDeleteModelVersion');
        modal.classList.remove('show');

        this.renderer.removeClass(document.body, 'is-modal');
    }

    /**
     * Deletes model version
     */
    deleteModelVersion(): void {
        this.modelsService
            .deleteModelVersion(this.model.name, this.model.version)
            .pipe(
                catchError((error) => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.closeModal();
                this.deletedModelVersion.emit(response.message);
            });
    }
}
