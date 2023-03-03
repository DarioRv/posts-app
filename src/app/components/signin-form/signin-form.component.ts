import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userData: UserDataService) {
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
      this.userData.saveUser(user).subscribe();
      Swal.fire({
        title: 'Te has registrado',
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }else{
      this.form.markAllAsTouched();
    }
  }
}
