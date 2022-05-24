import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoginComponent } from './components/login/login.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { OtherUserProfileComponent } from './components/other-user-profile/other-user-profile.component';
import { OtherUserComponent } from './components/other-user-profile/other-user/other-user.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { UserHomeComponent } from './components/user-home/user-home.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserComponent } from './components/user/user.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { ApproveVerificationComponent } from './components/verification-request/approve-verification/approve-verification.component';
import { VerificationRequestComponent } from './components/verification-request/verification-request.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'mainpage' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component:RegistrationComponent},
  { path: 'userHome', component:UserHomeComponent},
  { path: 'mainpage', component:MainpageComponent},
  { path: 'userpage', component:UserpageComponent},
  { path: 'user', component:UserComponent},
  { path: 'verifyAccount', component: VerificationRequestComponent},
  { path: 'approveVerification', component:ApproveVerificationComponent },
  
  { path: 'otheruser', component: OtherUserProfileComponent,
    children: [{path: ':username', component: OtherUserComponent }] },

  {
    path: 'profile', component:UserComponent,
    children: [{ path: '', component: UserProfileComponent }]
  },
  {
    path: 'editUser', component: UserComponent,
    children: [{path: '', component: EditUserComponent}]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
