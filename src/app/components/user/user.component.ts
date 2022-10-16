import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { catchError } from 'rxjs/operators';
import { Hashtag } from 'src/app/models/hashtag/hashtag';
import { Model } from 'src/app/models/model/model';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
    username: string;
    user: User;
    userCategories: Hashtag[] = [];
    isLoggedInUser: boolean = false;
    userModels: Model[];
    filteredModels: Model[];
    chosenCategory: Hashtag = new Hashtag();
    userHashtags: Hashtag[] = [];

    constructor(
        private route: ActivatedRoute,
        private usersService: UsersService,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((routeParams) => {
            this.username = routeParams.username;

            if (this.username) {
                this.getUser();
            }
        });
    }

    /**
     * Wrapper for moment
     *
     * @param date Date to format
     * @returns Moment object
     */
    moment(date: any): moment.Moment {
        return moment(date);
    }

    /**
     * Gets user
     */
    getUser(): void {
        this.usersService.getUser(this.username).subscribe((response: any) => {
            this.user = response.data.results;
            this.userModels = this.filteredModels = this.user.models;

            this.getCurrentUser();
            this.getCategoriesFromModels();
            this.getUserHashtags();
        });
    }

    /**
     * Gets user's hashtags
     */
    getUserHashtags(): void {
        if (this.user?.hashtags) {
            this.userHashtags = this.user.hashtags.filter(
                (hashtag) => hashtag.key === 'hashtag'
            );
        }
    }

    /**
     * Gets current user if logged in
     */
    getCurrentUser(): void {
        if (this.authService.isLoggedIn()) {
            this.authService
                .getCurrentUser()
                .pipe(
                    catchError(() => {
                        return [];
                    })
                )
                .subscribe((response: any) => {
                    if (this.user.username === response.data.results.username) {
                        this.isLoggedInUser = true;
                    } else {
                        this.isLoggedInUser = false;
                    }
                });
        }
    }

    /**
     * Gets model's categories and creates array from unique values
     */
    getCategoriesFromModels(): void {
        if (this.user.models) {
            const categories = this.userModels.map((model) => {
                return model.hashtags;
            });

            categories.forEach((modelCategory) => {
                for (const category of modelCategory) {
                    // Category is only pushed to userCategories array if it doesn't yet exist
                    if (
                        !this.userCategories.find(
                            (userCategory) =>
                                userCategory.key === category.key &&
                                userCategory.value === category.value
                        )
                    ) {
                        this.userCategories.push(category);
                    }
                }
            });
        }
    }

    /**
     * Filters user's models by category
     *
     * @param category Category to filter models by
     */
    filterModelsByCategory(category: Hashtag = null): void {
        if (!category) {
            // If category is null all models are shown
            this.filteredModels = this.userModels;
        } else if (
            category.key === this.chosenCategory.key &&
            category.value === this.chosenCategory.value
        ) {
            // If category parameter is the same as the already chosen category, filter is removed
            this.chosenCategory = new Hashtag();
            this.filteredModels = this.userModels;
        } else {
            // Filter models shown by category parameter
            this.chosenCategory = { ...category };
            this.filteredModels = this.userModels.filter((userModel) =>
                userModel.hashtags.find((hashtag) => hashtag.id === category.id)
            );
        }
    }
}
