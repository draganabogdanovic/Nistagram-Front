import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  loginError: boolean = false;

  constructor(private authService: AuthService, private route:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.login(this.username, this.password).subscribe(
      auth => {
        console.log(auth);
        this.route.navigateByUrl('/profile');
      },

      error => {
        console.log(error.status);
        this.loginError = true;
      }
    );
    
  }

}
