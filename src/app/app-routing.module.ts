import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuardService as AuthGuard} from './core/guard/auth-guard.service';
import {HomeComponent} from './home/home.component';
import {SecuredComponent} from './secured/secured.component';
import {AllcoursesComponent} from './allcourses/allcourses.component';
import {ChangecoureComponent} from './changecoure/changecoure.component';
import {CreatecourseComponent} from './createcourse/createcourse.component';
import {ContactComponent} from './contact/contact.component';
import {UserprofileComponent} from './userprofile/userprofile.component';
import {ExampleofcoursesComponent} from './exampleofcourses/exampleofcourses.component';
import {EndofcourseComponent} from './endofcourse/endofcourse.component';
import {StartofcourseComponent} from './startofcourse/startofcourse.component';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'allcourse', canActivate: [AuthGuard], component: AllcoursesComponent},
  {path: 'changecourse/:id', component: ChangecoureComponent},
  {path: 'changecourse', component: ChangecoureComponent},
  {path: 'createcourse', component: CreatecourseComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'userprofile', canActivate: [AuthGuard], component: UserprofileComponent},
  {path: 'excourse/:id', canActivate: [AuthGuard], component: ExampleofcoursesComponent},
  {path: 'startcourse/:id', canActivate: [AuthGuard], component: StartofcourseComponent},
  {path: 'endcourse/:id', canActivate: [AuthGuard], component: EndofcourseComponent},
  {path: '', component: HomeComponent},
  {path: 'secured', canActivate: [AuthGuard], component: SecuredComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
