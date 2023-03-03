import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent {
  form!: FormGroup;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  })

  constructor(private formBuilder: FormBuilder, private userData: UserDataService, private router: Router) {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      dateOfBirth: ['', [Validators.required]],
      sex: ['', [Validators.required]]
    });
  }

  get User() {
    return this.form.get('user');
  }

  get Password() {
    return this.form.get("password");
  }

  get Mail() {
   return this.form.get("email");
  }

  get DateOfBirth() {
    return this.form.get("dateOfBirth");
  }

  get Sex() {
    return this.form.get("sex");
  }

  sendForm(event: Event) {
    event.preventDefault;
    if (this.form.valid){
      const user = {
        "username": this.form.get('user')?.value,
        "password": this.form.get('password')?.value,
        "email": this.form.get('email')?.value,
        "dateOfBirth": this.form.get('dateOfBirth')?.value,
        "sex": this.form.get('sex')?.value
      };
      this.userData.saveUser(user).subscribe(data => {}, HttpResponse => {
        if (HttpResponse.status == 200) {
          this.Toast.fire({
            icon: 'success',
            title: 'Te has registrado. Redirigiendo al inicio'
          })
          setTimeout(() => {
            this.router.navigateByUrl('/');
          }, 2000);
        }
        else if (HttpResponse.status == 400) {
          this.Toast.fire({
            icon: 'error',
            title: 'No es posible conectar con el servidor. Error: ' + HttpResponse.status
          })
        }
        else if (HttpResponse.status == 500) {
          this.Toast.fire({
            icon: 'error',
            title: 'El usuario indicado ya esta registrado'
          })
        }
        else {
          this.Toast.fire({
            icon: 'error',
            title: 'No es posible realizar esta acción en este momento. Error desconocido'
          })
        }
      });
    }else{
      this.form.markAllAsTouched();
    }
  }
}
