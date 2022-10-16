import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistrationComponent } from './components/auth/registration/registration.component';
import { ResetPasswordRequestComponent } from './components/auth/reset-password-request/reset-password-request.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { DeployComponent } from './components/deploy/deploy.component';
import { SentimentAnalysisComponent } from './components/examples/sentiment-analysis/sentiment-analysis.component';
import { FaqComponent } from './components/faq/faq.component';
import { FeedComponent } from './components/feed/feed.component';
import { CreateModelComponent } from './components/forms/create-model/create-model.component';
import { FeatureAccessRequestComponent } from './components/forms/feature-access-request/feature-access-request.component';
import { ModelFormComponent } from './components/forms/model-form/model-form.component';
import { UserFormComponent } from './components/forms/user-form/user-form.component';
import { ModelRequestFormComponent } from './components/model-requests/model-request-form/model-request-form.component';
import { ModelRequestComponent } from './components/model-requests/model-request/model-request.component';
import { ModelRequestsListComponent } from './components/model-requests/model-requests-list/model-requests-list.component';
import { ModelComponent } from './components/model/model.component';
import { ModelsComponent } from './components/models/models.component';
import { SearchComponent } from './components/search/search.component';
import { LikesComponent } from './components/user-dashboard/likes/likes.component';
import { SummaryComponent } from './components/user-dashboard/summary/summary.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    { path: '', component: FeedComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'reset-password', component: ResetPasswordRequestComponent },
    { path: 'reset-password/:token', component: ResetPasswordComponent },
    { path: 'profiles', component: UsersComponent },
    { path: 'profiles/:username', component: UserComponent },
    {
        path: 'profiles/:username/edit',
        component: UserFormComponent,
        canActivate: [AuthGuard],
    },
    { path: 'models', component: ModelsComponent },
    { path: 'models/create', component: CreateModelComponent, canActivate: [AuthGuard] },
    { path: 'models/:modelname', component: ModelComponent },
    {
        path: 'models/:modelname/edit',
        component: ModelFormComponent,
        canActivate: [AuthGuard],
    },
    { path: 'search', component: SearchComponent },
    { path: 'deploy', component: DeployComponent },
    { path: 'requests', component: ModelRequestsListComponent },
    { path: 'requests/:requestid', component: ModelRequestComponent },
    { path: 'model-requests', component: ModelRequestFormComponent, canActivate: [AuthGuard] },
    { path: 'access/:feature', component: FeatureAccessRequestComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'dashboard/summary', component: SummaryComponent, canActivate: [AuthGuard] },
    { path: 'dashboard/likes', component: LikesComponent, canActivate: [AuthGuard] },
    { path: 'showcase/sentiment-analysis', component: SentimentAnalysisComponent },
    { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
