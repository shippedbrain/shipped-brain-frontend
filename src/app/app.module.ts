import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarModule } from 'ngx-avatar';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MarkdownModule } from 'ngx-markdown';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthSideContentComponent } from './components/auth/auth-side-content/auth-side-content.component';
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
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { NavMenuItemsComponent } from './components/layout/header/nav-menu-items/nav-menu-items.component';
import { DeleteModelCommentModalComponent } from './components/modals/delete-model-comment-modal/delete-model-comment-modal.component';
import { DeleteModelModalComponent } from './components/modals/delete-model-modal/delete-model-modal.component';
import { MarkdownInfoModalComponent } from './components/modals/markdown-info-modal/markdown-info-modal.component';
import { ModelCommentComponent } from './components/model-comment/model-comment.component';
import { ModelCommentsComponent } from './components/model-comments/model-comments.component';
import { ModelRequestFormComponent } from './components/model-requests/model-request-form/model-request-form.component';
import { ModelRequestComponent } from './components/model-requests/model-request/model-request.component';
import { ModelRequestsListComponent } from './components/model-requests/model-requests-list/model-requests-list.component';
import { ModelUploadComponent } from './components/model-upload/model-upload.component';
import { ModelComponent } from './components/model/model.component';
import { ModelsComponent } from './components/models/models.component';
import { PaperComponent } from './components/paper/paper.component';
import { SearchComponent } from './components/search/search.component';
import { LikesComponent } from './components/user-dashboard/likes/likes.component';
import { SidebarNavComponent } from './components/user-dashboard/sidebar-nav/sidebar-nav.component';
import { SummaryComponent } from './components/user-dashboard/summary/summary.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { BrandComponent } from './components/utilities/brand/brand.component';
import { ChartComponent } from './components/utilities/chart/chart.component';
import { DatatablesComponent } from './components/utilities/datatables/datatables.component';
import { EmptyStateComponent } from './components/utilities/empty-state/empty-state.component';
import { FixedWidgetBadgeComponent } from './components/utilities/fixed-widget-badge/fixed-widget-badge.component';
import { InfoMessageComponent } from './components/utilities/info-message/info-message.component';
import { LoadingIconComponent } from './components/utilities/loading-icon/loading-icon.component';
import { LoadingComponent } from './components/utilities/loading/loading.component';
import { MarkdownComponent } from './components/utilities/markdown/markdown.component';
import { ModelCardGridComponent } from './components/utilities/model-card-grid/model-card-grid.component';
import { ModelCardComponent } from './components/utilities/model-card/model-card.component';
import { NavLinkBadgeComponent } from './components/utilities/nav-link-badge/nav-link-badge.component';
import { PaperListItemComponent } from './components/utilities/paper-list-item/paper-list-item.component';
import { PaperListComponent } from './components/utilities/paper-list/paper-list.component';
import { ShareGroupComponent } from './components/utilities/share-group/share-group.component';
import { StatInfoComponent } from './components/utilities/stat-info/stat-info.component';
import { TabComponent } from './components/utilities/tab/tab.component';
import { TabsComponent } from './components/utilities/tabs/tabs.component';
import { TooltipComponent } from './components/utilities/tooltip/tooltip.component';
import { UserCardGridComponent } from './components/utilities/user-card-grid/user-card-grid.component';
import { UserCardComponent } from './components/utilities/user-card/user-card.component';
import { UserListItemComponent } from './components/utilities/user-list-item/user-list-item.component';
import { UserListComponent } from './components/utilities/user-list/user-list.component';
import { FrameworkDirective } from './directives/framework/framework.directive';
import { HashtagDirective } from './directives/hashtag/hashtag.directive';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { CombineListElementsPipe } from './pipes/combine-list-elements.pipe';
import { GetFriendlyUrlPipe } from './pipes/get-friendly-url.pipe';
import { GetPossessiveEndingPipe } from './pipes/get-possessive-ending.pipe';
import { GetWordFromStringPipe } from './pipes/get-word-from-string.pipe';
import { HandleEmptyPipe } from './pipes/handle-empty.pipe';
import { HandlePluralizationPipe } from './pipes/handle-pluralization.pipe';
import { ModelRequestInfoTypePipe } from './pipes/model-request-info-type.pipe';
import { Nl2brPipe } from './pipes/nl2br.pipe';
import { ParseUrlFriendlyTextPipe } from './pipes/parse-url-friendly-text.pipe';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ModelsUploadService } from './services/models-upload.service';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        FeedComponent,
        UserComponent,
        CapitalizePipe,
        ModelComponent,
        TruncatePipe,
        SearchComponent,
        HandlePluralizationPipe,
        ModelsComponent,
        UsersComponent,
        GetWordFromStringPipe,
        UserCardComponent,
        ModelCardComponent,
        UserCardGridComponent,
        ModelCardGridComponent,
        LoginComponent,
        RegistrationComponent,
        AuthSideContentComponent,
        HandleEmptyPipe,
        ModelUploadComponent,
        UserFormComponent,
        ShareGroupComponent,
        GetPossessiveEndingPipe,
        StatInfoComponent,
        ModelFormComponent,
        GetFriendlyUrlPipe,
        ParseUrlFriendlyTextPipe,
        DeleteModelModalComponent,
        LoadingComponent,
        LoadingIconComponent,
        SummaryComponent,
        DatatablesComponent,
        ChartComponent,
        ResetPasswordRequestComponent,
        BrandComponent,
        ResetPasswordComponent,
        FeatureAccessRequestComponent,
        InfoMessageComponent,
        Nl2brPipe,
        ModelRequestsListComponent,
        ModelRequestComponent,
        ModelRequestFormComponent,
        ModelRequestInfoTypePipe,
        TooltipComponent,
        FaqComponent,
        FixedWidgetBadgeComponent,
        MarkdownInfoModalComponent,
        NavLinkBadgeComponent,
        LikesComponent,
        SidebarNavComponent,
        SentimentAnalysisComponent,
        UserListComponent,
        UserListItemComponent,
        NavMenuItemsComponent,
        HashtagDirective,
        PaperComponent,
        PaperListComponent,
        PaperListItemComponent,
        CombineListElementsPipe,
        DeployComponent,
        MarkdownComponent,
        FrameworkDirective,
        TabsComponent,
        TabComponent,
        CreateModelComponent,
        SafeHtmlPipe,
        EmptyStateComponent,
        ModelCommentsComponent,
        ModelCommentComponent,
        DeleteModelCommentModalComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        AvatarModule,
        CommonModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        MarkdownModule.forRoot({ sanitize: SecurityContext.NONE }),
        InfiniteScrollModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LoadingInterceptor,
            multi: true,
        },
        ModelsUploadService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
