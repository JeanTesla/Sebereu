import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/UX/toast.service';
import { SignInService } from 'src/app/services/auth/sign-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class AppSideLoginComponent {

  authForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(
    private signIn: SignInService,
    private toastService: ToastService,
    private router: Router
  ) { }

  doLogin(){
    const authData = {
      email: this.authForm.get('email')?.value,
      password: this.authForm.get('password')?.value
    }
    this.signIn.auth(authData)
    .subscribe(result => {
      localStorage.setItem('userId', result.userId);
      this.toastService.show("Aguarde...");
      setTimeout(() => {
        this.router.navigate(["/home"]);
      },2000)
    })
  }
}
