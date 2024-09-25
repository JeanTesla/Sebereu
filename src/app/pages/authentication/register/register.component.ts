import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, timeout } from 'rxjs';
import { ToastService } from 'src/app/services/UX/toast.service';
import { SignUpService } from 'src/app/services/auth/sign-up.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class AppSideRegisterComponent {
  constructor(
    private router: Router,
    private signUpService: SignUpService,
    private toast: ToastService
  ) { }

  formSignUp = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    passwordRepeat: new FormControl('', [Validators.required]),
  });

  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  doSignUp() {
    const signUpData = this.formSignUp.value;

    if (!this.formSignUp.valid) {
      this.toast.show("Dados inválidos");
      return;
    }

    if (signUpData.password != signUpData.passwordRepeat) {
      this.toast.show("As senhas informadas não correspondem.");
      return;
    }

    this.signUpService.signUp(signUpData)
      .subscribe(response => {
        this.toast.show("Usuário cadastrado com sucesso. Redirecionando para a tela de login.")
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000)
      })
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  toggleConfirmPasswordVisibility() {
    this.hideConfirmPassword = !this.hideConfirmPassword;
  }
}
