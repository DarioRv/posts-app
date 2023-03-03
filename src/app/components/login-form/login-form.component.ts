import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserActions } from 'src/app/services/user-actions';
import { UserDataService } from 'src/app/services/user-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  form!: FormGroup;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  })

  constructor(private formBuilder: FormBuilder, private userData: UserDataService, private userActions: UserActions) {
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
        this.userActions.login(data);
      }, HttpResponse => {
        if (HttpResponse.status == 400) {
          this.Toast.fire({
            icon: 'error',
            title: 'No es posible conectar con el servidor. Error: ' + HttpResponse.status
          })
        }
        else if (HttpResponse.status == 500) {
          this.Toast.fire({
            icon: 'error',
            title: 'El servidor esta experimentando problemas, intente mas tarde'
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
