import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { ModelComment } from 'src/app/models/model-comment/model-comment';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { ModelCommentsService } from 'src/app/services/model-comments.service';

@Component({
    selector: 'app-model-comments',
    templateUrl: './model-comments.component.html',
    styleUrls: ['./model-comments.component.scss'],
})
export class ModelCommentsComponent implements OnInit {
    @Input() modelName: string;
    @Input() currentUser: User;
    @Output() updateCommentCount: EventEmitter<boolean> = new EventEmitter<boolean>();
    isLoggedInUser: boolean = false;
    isTextareaExpanded: boolean = false;
    comment: string = '';
    modelComments: ModelComment[] = [];
    successMsgs = {
        addComment: '',
        getComments: '',
    };
    errorMsgs = {
        addComment: '',
        getComments: '',
    };
    loading = {
        addComment: false,
        getComments: false,
    };
    pageNumber: number = 1;
    resultsPerPage: number = 5;
    showLoadMore: boolean = false;

    constructor(
        private authService: AuthService,
        private modelCommentsService: ModelCommentsService
    ) {}

    ngOnInit(): void {
        this.validateUserAuth();
        this.getComments();
    }

    /**
     * Checks if user is logged in
     */
    validateUserAuth(): void {
        this.isLoggedInUser = this.authService.isLoggedIn();
    }

    /**
     * Sets isTextarea expanded to true
     */
    expandTextarea(): void {
        this.isTextareaExpanded = true;
    }

    /**
     * Sets isTextarea expanded to false
     */
    shrinkTextarea(): void {
        this.isTextareaExpanded = false;
    }

    /**
     * Adds comment to model
     */
    addComment(): void {
        this.successMsgs.addComment = this.errorMsgs.addComment = '';
        this.loading.addComment = true;

        this.modelCommentsService
            .addComment(this.modelName, this.comment)
            .pipe(finalize(() => (this.loading.addComment = false)))
            .pipe(
                catchError((error: any) => {
                    this.errorMsgs.addComment = error.error.message ?? 'Unable to add comment';
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.successMsgs.addComment = response.message;
                this.isTextareaExpanded = false;
                this.comment = '';
                this.pageNumber = 1;
                this.modelComments = [];
                this.updateCommentCount.emit(true);

                this.getComments();
            });
    }

    /**
     * Gets model's comments
     */
    getComments(): void {
        this.successMsgs.getComments = this.errorMsgs.getComments = '';
        this.loading.getComments = true;

        this.modelCommentsService
            .getComments(this.modelName, false, this.pageNumber, this.resultsPerPage)
            .pipe(finalize(() => (this.loading.getComments = false)))
            .pipe(
                catchError((error: any) => {
                    this.errorMsgs.getComments =
                        error.error.message ?? 'An error occurred while retrieving comments';
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.modelComments.push(...response.data.results);
                this.showLoadMore =
                    response.data.results.length > 0 &&
                    response.data.results.length === this.resultsPerPage;
            });
    }

    /**
     * Increments page number and calls getComments()
     */
    loadMore(): void {
        this.pageNumber += 1;
        this.getComments();
    }

    /**
     * Runs when an event is received from model comment component to update list of comments
     */
    onTriggerGetComments(): void {
        this.pageNumber = 1;
        this.modelComments = [];
        this.getComments();
    }
}
