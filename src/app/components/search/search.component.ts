import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { Hashtag } from 'src/app/models/hashtag/hashtag';
import { Model } from 'src/app/models/model/model';
import { User } from 'src/app/models/user/user';
import { HashtagService } from 'src/app/services/hashtag.service';
import { MlModelsService } from 'src/app/services/ml-models.service';
import { UsersService } from 'src/app/services/users.service';
import { ParseUrlFriendlyTextPipe } from '../../pipes/parse-url-friendly-text.pipe';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [ParseUrlFriendlyTextPipe],
})
export class SearchComponent implements OnInit, AfterViewInit {
    @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
    searchQuery: string = '';
    users: User[] = [];
    models: Model[] = [];
    hashtags: Hashtag[] = [];
    hasSearched: boolean = false;
    queryParam: string;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private usersService: UsersService,
        private modelsService: MlModelsService,
        private hashtagService: HashtagService,
        private parseUrlFriendlyTextPipe: ParseUrlFriendlyTextPipe
    ) {}

    ngOnInit(): void {
        this.activeRoute.queryParams.subscribe((queryParams) => {
            this.queryParam = queryParams.for;

            if (this.queryParam) {
                this.searchInput.nativeElement.value = this.parseUrlFriendlyTextPipe.transform(
                    this.queryParam
                );

                this.getSearchResults();
            }
        });
    }

    ngAfterViewInit(): void {
        fromEvent(this.searchInput.nativeElement, 'keyup')
            .pipe(
                filter(Boolean),
                debounceTime(1000),
                distinctUntilChanged(),
                tap(() => {
                    this.getSearchResults();
                })
            )
            .subscribe();
    }

    /**
     * Removes parameters from URL
     */
    removeQueryParams(): void {
        this.router.navigate([], {
            queryParams: {
                for: null,
            },
            queryParamsHandling: 'merge',
        });
    }

    /**
     * Gets search results if search input is not empty, otherwise clears search
     */
    getSearchResults(): void {
        this.hasSearched = false;

        this.removeQueryParams();

        if (this.searchInput.nativeElement.value) {
            this.searchUsers();
            this.searchModels();
            this.searchHashtagModels();
        } else {
            this.clearSearch();
        }
    }

    /**
     * Searches users
     */
    searchUsers(): void {
        this.hasSearched = false;

        this.usersService
            .getUsers(this.searchInput.nativeElement.value)
            .subscribe((response: any) => {
                this.users = response.data.results;
                this.hasSearched = true;
            });
    }

    /**
     * Searches models
     */
    searchModels(): void {
        this.hasSearched = false;

        this.modelsService
            .getRegisteredModels(this.searchInput.nativeElement.value)
            .subscribe((response: any) => {
                this.models = response.data.results;
                this.hasSearched = true;
            });
    }

    /**
     * Searches models by hashtag
     */
    searchHashtagModels(): void {
        this.hasSearched = false;

        this.hashtagService
            .searchModelsByHashtagValue(this.searchInput.nativeElement.value)
            .subscribe((response: any) => {
                this.hashtags = response.data.results;
                this.hasSearched = true;
            });
    }

    /**
     * Clears search input and results
     */
    clearSearch(): void {
        this.searchInput.nativeElement.value = '';
        this.users = [];
        this.models = [];
        this.hasSearched = false;
    }
}
