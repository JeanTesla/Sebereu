import { AuthService } from '../../services/auth/auth.service';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-auth',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  email = new FormControl()
  password = new FormControl()

  constructor(private signInService: AuthService) {
    this.email.setValue("jean@gmail.com");
    this.password.setValue("123456");
  }

  doSignIn() {
    this.signInService.signIn(this.email.value, this.password.value)
      .subscribe(data => { console.log(data.toString()) })
  }

}
