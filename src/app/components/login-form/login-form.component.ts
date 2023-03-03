import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userData: UserDataService) {
    this.form = this.formBuilder.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get Password() {
    return this.form.get("password");
  }

  get User() {
   return this.form.get("user");
  }

  sendForm(event: Event) {
    event.preventDefault;
    if (this.form.valid){
      const userLogin = {
        "username": this.User?.value,
        "password": this.Password?.value
      };
      this.userData.login(userLogin).subscribe((data: any) => {
        if (data != null) {
          Swal.fire({
            title: 'Has iniciado sesion',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }
        else {
          Swal.fire({
            title: 'Credenciales incorrectas',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      });
    }else{
      this.form.markAllAsTouched();
    }
  }
}
