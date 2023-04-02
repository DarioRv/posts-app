import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserActions } from 'src/app/services/user-actions';
import { UserDataService } from 'src/app/services/user-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'signin-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  form!: FormGroup;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  })
  sendingForm: boolean = false

  constructor(private formBuilder: FormBuilder, private userData: UserDataService, private userActions: UserActions) {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      day: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
      sex: ['', [Validators.required]]
    });
  }

  get User() {
    return this.form.get('user');
  }

  get Password() {
    return this.form.get('password');
  }

  get Mail() {
   return this.form.get('email');
  }

  get Day() {
    return this.form.get('day');
  }

  get Month() {
    return this.form.get('month');
  }

  get Year() {
    return this.form.get('year');
  }

  get Sex() {
    return this.form.get('sex');
  }

  sendForm(event: Event) {
    event.preventDefault;
    if (this.form.valid){
      this.sendingForm = true;
      const user = {
        "username": this.form.get('user')?.value,
        "password": this.form.get('password')?.value,
        "email": this.form.get('email')?.value,
        "dateOfBirth": `${this.form.get('day')?.value}/${this.form.get('month')?.value}/${this.form.get('year')?.value}`,
        "sex": this.form.get('sex')?.value
      };
      this.userData.saveUser(user).subscribe(() => {
        this.Toast.fire({
          icon: 'success',
          title: 'Te has registrado. Iniciando sesion.'
        })},
        (error: any) => {
          if (error.status === 0) {
            this.Toast.fire({
              icon: 'error',
              title: 'Se ha perdido la conexión con el servidor'
            })
          }
          if (error.status === 404) {
            this.Toast.fire({
              icon: 'error',
              title: 'Solicitud no encontrada'
            })
          }
          if (error.status === 500) {
            this.Toast.fire({
              icon: 'error',
              title: 'El username elegido no esta disponible'
            })
          }
          this.sendingForm = false;
        },
        () => {
          const userLogin = {"username": this.form.get('user')?.value, "password": this.form.get('password')?.value};
          setTimeout(() => {
            this.userData.login(userLogin).subscribe(data => {
              this.userActions.login(data)
            });
          }, 2000);
        }
      );
    }else{
      this.form.markAllAsTouched();
    }
  }
}
