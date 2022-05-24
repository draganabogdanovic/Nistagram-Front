import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VerificationRequest } from 'src/app/model/verificationRequest.model';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-verification-request',
  templateUrl: './verification-request.component.html',
  styleUrls: ['./verification-request.component.scss']
})
export class VerificationRequestComponent implements OnInit {

  verificationReqForm: FormGroup;
  document: string;

  verReq: VerificationRequest = new VerificationRequest();

  constructor(private userService: UserService, private formBuilder: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.verificationReqForm = this.formBuilder.group({
      name: new FormControl(),
      surname: new FormControl(),
      category: new FormControl(),
      media: new FormControl()
    })
  }
  
  onSubmit(){

    const formData = new FormData();

    if (!this.document) {
      this.snackBar.open('No document selected.', 'Ok', { duration: 5000 });
      return;
    }

    formData.append("media", this.document);

    if (this.verificationReqForm.get('name').value) {
      formData.append("name", this.verificationReqForm.get('name').value);
    }

    if (this.verificationReqForm.get('surname').value) {
      formData.append("surname", this.verificationReqForm.get('surname').value);
    }

    if(this.verificationReqForm.get('category').value) {
      formData.append("category", this.verificationReqForm.get('category').value)
    }

    console.log(formData)

    this.userService.sendRequest(formData).subscribe(data => {
      this.snackBar.open('Sent successfully.', 'Ok', { duration: 5000 })
    },
      err => {
        console.log(err.error)
      })
  }

  onFileSelect(event) {
    this.document = null;
    const file_form = this.verificationReqForm.get('media').value;
    this.document = file_form;
  }
}
