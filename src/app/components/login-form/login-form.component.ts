import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserActions } from 'src/app/services/user-actions';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  form!: FormGroup;
  sendingForm: boolean = false

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
      this.sendingForm = true;
      const userLogin = {
        "username": this.User?.value,
        "password": this.Password?.value
      };
      this.userData.login(userLogin).subscribe((userData: any) => {
        if (!this.userActions.login(userData)) {
          this.sendingForm = false;
        }
      });
    }
    else{
      this.form.markAllAsTouched();
    }
  }
}
