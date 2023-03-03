import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get Password() {
    return this.form.get("password");
  }

  get Mail() {
   return this.form.get("email");
  }

  sendForm(event: Event) {
    event.preventDefault;
    if (this.form.valid){
      alert("Todo salio bien ¡Enviar formuario!")
    }else{
      this.form.markAllAsTouched();
    }
  }
}
