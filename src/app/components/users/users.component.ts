import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { User } from 'src/app/models/user/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
    users: User[];
    loading: any = {
        users: false,
    };
    noUsersMessage: string = `
        <p>Looks like there are no profiles to show yet!</p>
        <a href="/register" class="link color-magenta">If you haven't already, why don't you join us?</a>
    `;

    constructor(private usersService: UsersService) {}

    ngOnInit(): void {
        this.getUsers();
    }

    /**
     * Gets all users
     */
    getUsers(): void {
        this.loading.users = true;

        this.usersService
            .getUsers()
            .pipe(finalize(() => (this.loading.users = false)))
            .subscribe((response: any) => {
                this.users = response.data.results;
            });
    }
}
