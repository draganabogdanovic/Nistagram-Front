import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UserHomeComponent } from './components/user-home/user-home.component';
import { MainpageComponent } from './components/mainpage/mainpage.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { UserComponent } from './components/user/user.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { OwlModule } from 'ngx-owl-carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PostDialogComponent } from './components/user/post-dialog/post-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StoryDialogComponent } from './components/user/story-dialog/story-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { VerificationRequestComponent } from './components/verification-request/verification-request.component';
import { ApproveVerificationComponent } from './components/verification-request/approve-verification/approve-verification.component';
import { HighlightDialogComponent } from './components/user/highlight-dialog/highlight-dialog.component';
import { PostReportDialogComponent } from './components/user/post-report-dialog/post-report-dialog.component';
import { StoryReportDialogComponent } from './components/user/story-report-dialog/story-report-dialog.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { SavePostDialogComponent } from './components/user/save-post-dialog/save-post-dialog.component';
import { OtherUserProfileComponent } from './components/other-user-profile/other-user-profile.component';
import { OtherUserComponent } from './components/other-user-profile/other-user/other-user.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UserHomeComponent,
    MainpageComponent,
    UserpageComponent,
    UserComponent,
    OtherUserProfileComponent,
    UserProfileComponent,
    EditUserComponent,
    PostDialogComponent,
    StoryDialogComponent,
    VerificationRequestComponent,
    ApproveVerificationComponent,
    HighlightDialogComponent,
    PostReportDialogComponent,
    StoryReportDialogComponent,
    SavePostDialogComponent,
    OtherUserComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatMenuModule,
    AppRoutingModule,
    MatInputModule,
    MatIconModule,
    MatDividerModule,
    MatTabsModule,
    MatGridListModule,
    OwlModule,
    ReactiveFormsModule,
    NgxMatFileInputModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableExporterModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
