import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';
import {
    catchError,
    debounceTime,
    distinctUntilChanged,
    filter,
    finalize,
    map,
    tap,
} from 'rxjs/operators';
import { Filter } from 'src/app/models/filter/filter';
import {
    GlobalCategory,
    GLOBAL_CATEGORIES,
    MODELS_CATEGORY,
    PROFILES_CATEGORY,
} from 'src/app/models/global-category/global-category';
import { Hashtag } from 'src/app/models/hashtag/hashtag';
import { Model } from 'src/app/models/model/model';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { HashtagService } from 'src/app/services/hashtag.service';
import { MlModelsService } from 'src/app/services/ml-models.service';
import { UsersService } from 'src/app/services/users.service';
import { FEED_FILTERS } from './feed-filters';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit, AfterViewInit {
    @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

    pageNumber: number = 1;
    resultsPerPage: number = 10;
    models: Model[] = [];
    profiles: User[] = [];
    globalCategories: GlobalCategory[] = GLOBAL_CATEGORIES;
    categories: Hashtag[];
    orderFilters: Filter[] = FEED_FILTERS;
    activeOrder: Filter;
    activeCategory: Hashtag;
    activeGlobalCategory: Hashtag;
    loading: any = {
        feed: false,
    };
    needsLoading: boolean = true;
    isFirstFetch: boolean = true;
    showLoadMore: boolean = false;
    ctaButton = {
        text: '',
        url: '',
    };

    constructor(
        private modelsService: MlModelsService,
        private hashtagService: HashtagService,
        private usersService: UsersService,
        private authService: AuthService,
        private activatedRoute: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.activeOrder = this.orderFilters[0];
        this.activeGlobalCategory = this.globalCategories.length
            ? this.globalCategories[0]
            : null;

        this.getQueryParams();
        this.validateCtaButtonAction();
    }

    ngAfterViewInit() {
        fromEvent(this.searchInput.nativeElement, 'keyup')
            .pipe(
                filter(Boolean),
                debounceTime(1000),
                distinctUntilChanged(),
                tap(() => {
                    this.searchCategory();
                })
            )
            .subscribe();
    }

    /**
     * Decide the CTA's button action depending on whether user is logged in or not
     */
    validateCtaButtonAction(): void {
        if (this.authService.isLoggedIn()) {
            this.ctaButton = {
                text: 'Create Model',
                url: '/models/create',
            };
        } else {
            this.ctaButton = {
                text: 'Create account',
                url: '/register',
            };
        }
    }

    /**
     * Gets query params.
     * If 'show' param has a value, activeGlobalCategory is set.
     * If 'query' param exists, search box text is set to its value.
     */
    getQueryParams(): void {
        this.activatedRoute.queryParamMap
            .pipe(map((params: any) => params.params))
            .subscribe((params: any) => {
                // If 'query' param exists, assign its value to the search input
                if (params.query) {
                    this.searchInput.nativeElement.value = params.query;
                }

                this.setGlobalCategoryFromParam(params.show);
            });
    }

    /**
     * Checks param to set activeGlobalCategory
     *
     * @param param Param to set
     */
    setGlobalCategoryFromParam(param: string = ''): void {
        switch (param) {
            case 'models':
                this.activeGlobalCategory = this.globalCategories[0];
                break;
            case 'profiles':
                this.activeGlobalCategory = this.globalCategories[1];
                break;
        }

        // Remove query params from URL
        this.location.replaceState('');

        this.chooseGlobalCategory(this.activeGlobalCategory, true, param !== '');
    }

    /**
     * Get model categories from API
     */
    getModelCategories() {
        this.hashtagService
            .getHashtags('category')
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.categories = response.data.results.categories;
            });
    }

    /**
     * Get models for feed
     */
    getModels(): void {
        this.loading.feed = true;

        this.modelsService
            .getRegisteredModels(
                this.searchInput.nativeElement.value,
                this.activeOrder.key,
                this.pageNumber,
                this.resultsPerPage
            )
            .pipe(finalize(() => (this.loading.feed = false)))
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.models.push(...response.data.results);

                this.checkIfNeedsLoading((response.data.results as []).length);
            });
    }

    /**
     * Gets models according to category
     *
     * @param category Category to filter models by. When null, all models are shown
     */
    filterByCategory(category: Hashtag = null): void {
        this.setActiveCategory(category);

        if (this.activeCategory) {
            this.getModelsByCategory(category);
        } else {
            this.getModels();
        }
    }

    /**
     * Sets or removes active category
     *
     * @param category Category to activate. When null, all results are shown
     */
    setActiveCategory(category: Hashtag = null): void {
        if (category) {
            this.activeCategory =
                this.activeCategory && category.id === this.activeCategory.id
                    ? null
                    : category;
        } else {
            this.activeCategory = null;
        }
    }

    /**
     * Gets models belonging to category passed as parameter
     *
     * @param category Models' category
     */
    getModelsByCategory(category: Hashtag): void {
        this.hashtagService
            .getModelsByHashtag(category.id)
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.models = response.data.results;
            });
    }

    /**
     * Orders models according to filter passed as parameter
     *
     * @param order Order by which models should be orderer
     */
    orderModels(order: Filter): void {
        this.activeOrder = order;
        this.getModels();
    }

    /**
     * Clears search input
     */
    clearSearch(): void {
        this.searchInput.nativeElement.value = '';
    }

    /**
     * Get users for feed
     */
    getUsers(): void {
        this.loading.feed = true;

        this.usersService
            .getUsers(
                this.searchInput.nativeElement.value,
                this.pageNumber,
                this.resultsPerPage
            )
            .pipe(finalize(() => (this.loading.feed = false)))
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.profiles.push(...response.data.results);
                this.getUserCategories();

                this.checkIfNeedsLoading((response.data.results as []).length);
            });
    }

    /**
     * Joins categories from user and model hashtags
     */
    getUserCategories(): void {
        const hashtags = [];
        const categories = [];

        this.profiles.forEach((profile) => {
            hashtags.push(...profile.hashtags, ...profile.model_hashtags);
        });

        if (hashtags) {
            // TODO: Abstract logic
            hashtags.forEach((hashtag) => {
                if (
                    !categories.find(
                        (category) =>
                            hashtag.key === category.key && hashtag.value === category.value
                    )
                ) {
                    categories.push(hashtag);
                }
            });
        }

        this.categories = categories;
    }

    /**
     * Handle data fetching based on chosen global category
     *
     * @param globalCategory Chosen category
     * @param resetPageNumber Determines if page number should be reset
     * @param forceFetch Bypasses validations inside method to force data fetching
     */
    chooseGlobalCategory(
        globalCategory: Hashtag = this.activeGlobalCategory,
        resetPageNumber: boolean = false,
        forceFetch: boolean = false
    ): void {
        // Validate if it's necessary to get results when user clicks category to prevent fetching the 1st page repeatedly
        if (
            this.isFirstFetch ||
            this.activeGlobalCategory.key !== globalCategory.key ||
            this.pageNumber > 1 ||
            forceFetch
        ) {
            this.activeGlobalCategory = globalCategory;

            if (resetPageNumber) {
                this.pageNumber = 1;
                this.showLoadMore = false;
                this.models = this.profiles = [];
            }

            if (this.isFirstFetch) {
                this.isFirstFetch = false;
            }

            switch (this.activeGlobalCategory) {
                case MODELS_CATEGORY:
                    this.profiles = [];
                    this.setModelData();
                    break;
                case PROFILES_CATEGORY:
                    this.models = [];
                    this.getUsers();
                    break;
            }
        }
    }

    /**
     * If retrievedResultsCounts is equal to 10, it indicates a new request can be made to get a new page of results on scroll
     *
     * @param retrievedResultsCount Number of models or profiles retrieved from API
     */
    checkIfNeedsLoading(retrievedResultsCount: number): void {
        this.needsLoading = retrievedResultsCount === this.resultsPerPage;
    }

    /**
     * Get models and models' categories
     */
    setModelData(): void {
        this.getModelCategories();
        this.getModels();
    }

    /**
     * Event occurs when user scrolls to bottom of page.
     * Calls incrementCategoryPage method
     */
    onScroll(): void {
        if (this.pageNumber > 2 && !this.showLoadMore) {
            this.showLoadMore = true;
        }

        if (!this.showLoadMore && this.needsLoading) {
            this.incrementCategoryPage();
        }
    }

    /**
     * Calls incrementCategoryPage when user clicks Load More button
     */
    loadMore(): void {
        this.incrementCategoryPage();
    }

    /**
     * Increments pageNumber and calls chooseGlobalCategory method
     */
    incrementCategoryPage(): void {
        this.pageNumber++;
        this.chooseGlobalCategory();
    }

    /**
     * Searches by chosen category.
     * Before searching, data from models, profiles and page number are reset
     */
    searchCategory(): void {
        this.pageNumber = 1;
        this.showLoadMore = false;
        this.models = this.profiles = [];

        this.chooseGlobalCategory(this.activeGlobalCategory, true, true);
    }
}
