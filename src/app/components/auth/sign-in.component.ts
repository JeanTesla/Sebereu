import { AuthService } from '../../services/auth/auth.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SignInRequest } from 'src/app/rest/interfaces/sign-in-request';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  email = new FormControl()
  password = new FormControl()

  constructor(
    private signInService: AuthService,
    private route: Router
  ) {
    this.email.setValue("jean@gmail.com");
    this.password.setValue("123456");
  }

  doSignIn() {
    this.signInService.signIn(this.email.value, this.password.value)
      .subscribe((data: SignInRequest) => {
        localStorage.setItem("userId", data.userId.toString())
        this.route.navigate(["/home"]);
      })
  }

}
