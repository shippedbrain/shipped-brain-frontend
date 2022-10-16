import {
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import * as moment from 'moment';
import { fromEvent } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { Hashtag } from 'src/app/models/hashtag/hashtag';
import { Header } from 'src/app/models/header/header';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { NAV_ITEMS_LEFT, NAV_ITEMS_RESPONSIVE, NAV_ITEMS_RIGHT } from './header';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent
    implements OnInit, AfterViewInit, AfterViewChecked, AfterContentInit
{
    @Input() isFeed: boolean = true;
    @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

    user: User;
    isLoggedIn: boolean = false;
    navItemsLeft: Header[] = NAV_ITEMS_LEFT;
    navItemsRight: Header[] = NAV_ITEMS_RIGHT;
    navItemsResponsive: Header[] = NAV_ITEMS_RESPONSIVE;
    notificationList: object[];
    notifications: object[];
    searchCategories: Hashtag[];
    searchText: string = '';
    showSearchInput: boolean = false;

    constructor(
        private authService: AuthService,
        private usersService: UsersService,
        private router: Router
    ) {}

    ngOnInit(): void {
        window.onscroll = () => {
            this.shrinkNavbarOnScroll();
        };
    }

    ngAfterContentInit(): void {
        this.checkIfUserLoggedIn();
        this.checkIfPhotoWasChanged();
    }

    ngAfterViewInit(): void {
        fromEvent(this.searchInput.nativeElement, 'keyup')
            .pipe(
                filter(Boolean),
                debounceTime(1000),
                distinctUntilChanged(),
                tap(() => {
                    this.searchText = this.searchInput.nativeElement.value;
                    this.searchInput.nativeElement.value = '';

                    this.router.navigate(['/'], {
                        queryParams: { query: this.searchText },
                    });
                })
            )
            .subscribe();
    }

    ngAfterViewChecked(): void {
        this.validateIfSearchIsShown();
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
     * Validates if current user is logged in, and if so gets user's data
     *
     * @returns true if user is logged in, else false
     */
    checkIfUserLoggedIn(): boolean {
        if (this.authService.isLoggedIn()) {
            this.getCurrentUser();
            return true;
        }

        this.authService.userLoggedIn.subscribe((loggedIn: boolean) => {
            if (loggedIn) {
                this.getCurrentUser();
                return true;
            }
        });

        return false;
    }

    /**
     * Get current user's data
     */
    getCurrentUser(): void {
        this.authService
            .getCurrentUser()
            .pipe(
                catchError(() => {
                    return [];
                })
            )
            .subscribe((response: any) => {
                this.user = response.data.results;
                this.isLoggedIn = true;
            });
    }

    /**
     * Logs out current user
     */
    logout(): void {
        this.user = null;
        this.authService.logout();

        window.location.href = '/';
    }

    /**
     * Shrinks navbar when user starts to scroll down from top of the page
     */
    shrinkNavbarOnScroll(): void {
        const navbar = document.getElementById('navbar');

        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            navbar.classList.add('shrink');
        } else {
            navbar.classList.remove('shrink');
        }
    }

    /**
     * Clear value from search input
     */
    clearSearch(): void {
        this.searchInput.nativeElement.value = '';
    }

    /**
     * Checks current route. If user is not on feed, navbar's search input is shown
     */
    validateIfSearchIsShown(): void {
        this.router.events.subscribe((route: any) => {
            if (route instanceof NavigationEnd) {
                this.showSearchInput = route.url.split('?')[0] !== '/';
            }
        });
    }

    /**
     * Checks if photo changed event was emitted.
     * When true, getCurrentUser method is called to update photo
     */
    checkIfPhotoWasChanged(): void {
        this.usersService.photoChanged.subscribe((photoChanged: boolean) => {
            if (photoChanged) {
                this.getCurrentUser();
            }
        });
    }
}
