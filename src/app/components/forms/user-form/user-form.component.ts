import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { Hashtag } from 'src/app/models/hashtag/hashtag';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { HashtagService } from 'src/app/services/hashtag.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
    updateSuccess: boolean = false;
    successMsgs = {
        user: '',
        password: '',
        hashtags: '',
        uploadImage: '',
    };
    errorMsgs = {
        user: '',
        password: '',
        hashtags: '',
        uploadImage: '',
    };
    username: string;
    user: User;
    newHashtag: string;
    userHashtags: Hashtag[] = [];
    loading = {
        profileUpdate: false,
        passwordUpdate: false,
        addHashtag: false,
        uploadImage: false,
    };
    userPhoto: any;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private usersService: UsersService,
        private hashtagsService: HashtagService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.username = this.activeRoute.snapshot.paramMap.get('username');

        if (this.username) {
            this.checkUserPermission();
            this.getUser();
        }
    }

    /**
     * Validates if user is allowed to edit profile
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

                if (currentUser.username !== this.username) {
                    this.router.navigateByUrl(`/profiles/${currentUser.username}`);
                }
            });
    }

    /**
     * Gets user's data
     */
    getUser(): void {
        this.usersService
            .getUser(this.username)
            .pipe(
                catchError((error) => {
                    this.errorMsgs.user = error.error.message ?? 'Unable to load profile data';
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.user = response.data.results;
                this.userPhoto = this.user.photo;

                this.getUserHashtags();
            });
    }

    /**
     * Filters hashtags with `hashtag` key from user's data
     */
    getUserHashtags(): void {
        if (this.user?.hashtags) {
            this.userHashtags = this.user.hashtags.filter(
                (hashtag) => hashtag.key === 'hashtag'
            );
        }
    }

    /**
     * Updates user's data
     */
    updateProfile(): void {
        this.errorMsgs.user = this.successMsgs.user = '';
        this.updateSuccess = false;
        this.loading.profileUpdate = true;

        this.usersService
            .updateUser(this.user)
            .pipe(finalize(() => (this.loading.profileUpdate = false)))
            .pipe(
                catchError((error) => {
                    this.errorMsgs.user = error.error.message ?? 'Unable to update profile';
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.user = response.data.results;
                this.successMsgs.user = response.message;
                this.updateSuccess = true;
            });
    }

    /**
     * Updates user's password.
     *
     * If successful, user is logged out and redirected to login page after 3 seconds
     */
    updatePassword(): void {
        this.errorMsgs.password = this.successMsgs.password = '';
        this.loading.passwordUpdate = true;

        this.usersService
            .updatePassword(this.user)
            .pipe(finalize(() => (this.loading.passwordUpdate = false)))
            .pipe(
                catchError((error: any) => {
                    this.errorMsgs.password =
                        error.error.message ?? 'Unable to update password';
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.successMsgs.password =
                    response.message +
                    `. <br>You will be redirected to the login page shortly.`;
                this.authService.logout();

                // Redirect to login after 3 seconds
                setTimeout(() => {
                    this.router.navigateByUrl('/login');
                }, 3000);
            });
    }

    /**
     * Validates user's hashtags
     *
     * @returns true if all validations passed, otherwise false
     */
    validateHashtags(): boolean {
        this.successMsgs.hashtags = this.errorMsgs.hashtags = '';

        if (!this.newHashtag) {
            this.errorMsgs.hashtags = 'Please enter an hashtag';
            return false;
        }

        if (this.userHashtags.length < 3) {
            return true;
        } else {
            this.errorMsgs.hashtags = 'You can only add up to 3 hashtags';
            return false;
        }
    }

    /**
     * Adds hashtag to user
     */
    addHashtag(): void {
        if (this.validateHashtags()) {
            const hashtag: Hashtag = {
                key: 'hashtag',
                value: this.newHashtag,
            };

            this.loading.addHashtag = true;

            this.hashtagsService
                .addUserHashtag(this.user.username, hashtag)
                .pipe(finalize(() => (this.loading.addHashtag = false)))
                .pipe(
                    catchError(() => {
                        this.errorMsgs.hashtags = 'An error ocurred while adding hashtag';

                        return [];
                    })
                )
                .subscribe(() => {
                    this.newHashtag = '';
                    this.successMsgs.hashtags = 'Successfully added hashtag';
                    this.getUser();
                });
        }
    }

    /**
     * Removes hashtag from user
     *
     * @param hashtagID ID of hashtag to remove
     */
    deleteHashtag(hashtagID: number): void {
        this.errorMsgs.hashtags = this.successMsgs.hashtags = '';

        this.hashtagsService
            .deleteUserHashtag(this.user.username, hashtagID)
            .pipe(
                catchError(() => {
                    this.errorMsgs.hashtags = 'An error ocurred while removing hashtag';
                    return [];
                })
            )
            .subscribe(() => {
                this.successMsgs.hashtags = 'Successfully removed hashtag';
                this.getUser();
            });
    }

    /**
     * Uploads user's photo
     *
     * @param event Event containing selected file
     */
    uploadImage(event: any): void {
        this.loading.uploadImage = true;
        this.successMsgs.uploadImage = this.errorMsgs.uploadImage = '';

        this.previewImage(event.target.files[0]);

        this.usersService
            .uploadPhoto(this.user, event.target.files[0])
            .pipe(finalize(() => (this.loading.uploadImage = false)))
            .pipe(
                catchError((error) => {
                    this.errorMsgs.uploadImage =
                        error.error.message ?? 'An error occurred while uploading photo';
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.successMsgs.uploadImage = response.message;

                // Emit photo changed event so header's photo can be updated
                this.usersService.photoChanged.emit(true);
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
            this.userPhoto = reader.result;
        };
    }
}
