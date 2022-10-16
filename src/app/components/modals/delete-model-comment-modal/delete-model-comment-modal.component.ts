import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { ModelComment } from 'src/app/models/model-comment/model-comment';
import { ModelCommentsService } from 'src/app/services/model-comments.service';

@Component({
    selector: 'app-delete-model-comment-modal',
    templateUrl: './delete-model-comment-modal.component.html',
    styleUrls: ['./delete-model-comment-modal.component.scss'],
})
export class DeleteModelCommentModalComponent {
    @Input() modelComment: ModelComment;
    @Output() modelCommentDeleted: EventEmitter<boolean> = new EventEmitter<boolean>();
    @ViewChild('modalDeleteComment')
    modalDeleteComment: ElementRef<HTMLDivElement>;
    appendedModal: HTMLDivElement;
    loading = {
        deleteComment: false,
    };

    constructor(
        private renderer: Renderer2,
        private modelCommentsService: ModelCommentsService
    ) {}

    /**
     * Opens delete comment's modal
     */
    openModal(): void {
        /**
         * Appended modal needs to be created so it can be appended at body element's end.
         * This is so modal displays without any style inconsistencies
         */
        this.appendedModal =
            this.appendedModal ??
            document.body.appendChild(this.modalDeleteComment.nativeElement);

        // Timeout is necessary so CSS transition is displayed correctly
        setTimeout(() => {
            this.appendedModal.classList.add('show');
            this.renderer.addClass(document.body, 'is-modal');
        }, 0);
    }

    /**
     * Closes delete comment's modal
     */
    closeModal(): void {
        this.appendedModal.classList.remove('show');
        this.renderer.removeClass(document.body, 'is-modal');

        // Timeout is necessary to wait for CSS transition to finish
        setTimeout(() => {
            document.body.removeChild(this.appendedModal);
            this.appendedModal = null;
        }, 250);
    }

    /**
     * Delete model comment.
     * If comment is deleted successfully, an event is emitted to parent component to trigger a new get for comments
     */
    deleteComment(): void {
        this.loading.deleteComment = true;

        this.modelCommentsService
            .deleteComment(this.modelComment.model_name, this.modelComment.id)
            .pipe(
                finalize(() => {
                    this.loading.deleteComment = false;
                    this.closeModal();
                })
            )
            .pipe(
                catchError(() => {
                    this.modelCommentDeleted.emit(false);
                    return [];
                })
            )
            .subscribe(() => {
                this.modelCommentDeleted.emit(true);
            });
    }
}
