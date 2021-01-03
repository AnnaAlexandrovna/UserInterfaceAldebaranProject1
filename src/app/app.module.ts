import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {ChangecoureComponent, StartChange} from './changecoure/changecoure.component';
import {AllcoursesComponent, NoData} from './allcourses/allcourses.component';
import {CreatecourseComponent, FailCreating, OkCreating, StartOfCreating} from './createcourse/createcourse.component';


import {AppRoutingModule} from './app-routing.module';
import {SecuredHttpInterceptor} from './core/interceptor/secured-http.interceptor';
import {AuthGuardService} from "./core/guard/auth-guard.service";
import {KeycloakService} from "./core/auth/keycloak.service";
import {CookieService} from "ngx-cookie-service";
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {SecuredComponent} from './secured/secured.component';
import {ContactComponent} from './contact/contact.component';
import {UserprofileComponent} from './userprofile/userprofile.component';
import {DialogData, ExampleofcoursesComponent, FailRun} from './exampleofcourses/exampleofcourses.component';
import {EndofcourseComponent} from './endofcourse/endofcourse.component';
import {ErrorDialog, StartofcourseComponent} from './startofcourse/startofcourse.component';
import {NotAllData} from './createcourse/createcourse.component';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {NgTerminalModule} from 'ng-terminal';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {NgxJsonViewerModule} from 'ngx-json-viewer';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from "@angular/material/list";
import {MatTabsModule} from "@angular/material/tabs";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MarkdownModule} from 'ngx-markdown';
import {SecurityContext} from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SecuredComponent,
    AllcoursesComponent,
    ChangecoureComponent,
    CreatecourseComponent,
    ContactComponent,
    UserprofileComponent,
    ExampleofcoursesComponent,
    EndofcourseComponent,
    StartofcourseComponent,
    DialogData,
    NotAllData,
    StartOfCreating,
    FailCreating,
    OkCreating,
    StartChange,
    NoData,
    ErrorDialog,
    FailRun
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    NgTerminalModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    NgxJsonViewerModule,
    MatListModule,
    MatTabsModule,
    MatCheckboxModule,
    MatMenuModule,
    MatProgressBarModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MarkdownModule.forRoot(),
  ],
  entryComponents: [DialogData, NotAllData, StartOfCreating, StartChange,
    FailCreating, OkCreating, NoData, ErrorDialog, FailRun],
  providers: [
    KeycloakService,
    AuthGuardService,
    MatDialog,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecuredHttpInterceptor,
      multi: true
    },
    NgbCarouselConfig,
    CookieService,
  ],
  bootstrap: [AppComponent, DialogData, NotAllData, StartOfCreating, FailCreating, OkCreating, StartChange, NoData,
    ErrorDialog, FailRun]
})
export class AppModule {
}
