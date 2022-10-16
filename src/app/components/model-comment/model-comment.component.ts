import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ModelComment } from 'src/app/models/model-comment/model-comment';
import { User } from 'src/app/models/user/user';

@Component({
    selector: 'app-model-comment',
    templateUrl: './model-comment.component.html',
    styleUrls: ['./model-comment.component.scss'],
})
export class ModelCommentComponent implements OnInit {
    @Input() modelComment: ModelComment;
    @Input() currentUser: User;
    @Output() triggerGetComments: EventEmitter<boolean> = new EventEmitter<boolean>();
    isModelOwner: boolean = false;
    canDeleteComment: boolean = false;

    constructor(private toastrService: ToastrService) {}

    ngOnInit(): void {
        this.checkIfCanDeleteComment();
    }

    /**
     * Wrapper for moment
     *
     * @param date Date to format
     * @returns Moment object
     */
    moment(date: Date | string): moment.Moment {
        return moment(date);
    }

    /**
     * Checks if current user can delete comment by validating if user posted comment or if user is the model owner
     */
    checkIfCanDeleteComment(): void {
        if (this.currentUser) {
            this.canDeleteComment = this.modelComment.username === this.currentUser.username;
        }
    }

    /**
     * Methods runs when delete model comment component attemps to delete a comment
     *
     * @param wasDeleted Value equals true if model was successfully deleted, otherwise false
     */
    onModelCommentDeleted(wasDeleted: boolean): void {
        if (wasDeleted) {
            this.toastrService.success('Successfully deleted comment', '', {
                closeButton: true,
            });
            this.triggerGetComments.emit(true);
        } else {
            this.toastrService.error('Unable to delete comment', '', { closeButton: true });
        }
    }
}
