import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  
  public user: User = new User();

  constructor(private authService: AuthService, private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.user);
    this.authService.signup(this.user).subscribe(data => {
        console.log(data);
        this.router.navigate(['login']);
        this.snackBar.open('Successfully registered!', 'Close', {duration: 10000});
      },
      error => {
        this.snackBar.open(error.error, 'Close', {duration: 10000});
      });
  }

}
