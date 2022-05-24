import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/model/user.model';

import { UserService } from 'src/app/services/user-service/user.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {

  constructor(private userService: UserService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }


  user: User;
  profilePictureUploadForm: FormGroup;
  profilePictureFile: string;


  ngOnInit(): void {
    this.getUserInfo();
    this.profilePictureUploadForm = this.formBuilder.group({
      media: new FormControl()
    })
  }

  onSubmit() {
    const formData = new FormData();

    if (!this.profilePictureFile) {
      this.snackBar.open('No file selected.', 'Ok', { duration: 5000 });
      return;
    }

    formData.append('media', this.profilePictureFile);

    this.userService.uploadProfilePicture(formData).subscribe(data => {
      this.snackBar.open('Profile picture updated.', 'Ok', { duration: 5000 });
      this.getUserInfo();
    },
    err => {
      console.log(err.error);
    })
  }

  onFileSelect(event) {
    this.profilePictureFile = null;
    const file_form = this.profilePictureUploadForm.get('media').value;
    this.profilePictureFile = file_form;
  }

  openDialog(event) {
    let input: HTMLElement = document.getElementsByClassName('input-file')[0] as HTMLElement;
    input.click();
  }

  public getUserInfo() {

    return this.userService.getUserInfo(
    ).subscribe(
      data => {
        console.log(data);
        this.user = data;
      }
    ),
      error => {
        console.log(error.error);
      };
  }

  save(): void {

    this.userService.editUser(this.user).subscribe(
      data => {
        console.log(data);
        //this.router.navigateByUrl('profile');

      }, error => {
        console.error('Error updating!', error)
      });
    //this.closeD();
  }
}
