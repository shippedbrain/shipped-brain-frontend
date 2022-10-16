import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-sidebar-nav',
    templateUrl: './sidebar-nav.component.html',
    styleUrls: ['./sidebar-nav.component.scss'],
})
export class SidebarNavComponent implements OnInit, OnDestroy {
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        if (!this.authService.isLoggedIn()) {
            document.body.classList.remove('is-dashboard');
            this.router.navigateByUrl('/login');
        } else {
            document.body.classList.add('is-dashboard');
        }
    }

    ngOnDestroy(): void {
        document.body.classList.remove('is-dashboard');
    }
}
