import { Component, OnInit } from '@angular/core';
import { UserActions } from 'src/app/services/user-actions';

@Component({
  selector: 'user-account-settings',
  templateUrl: './user-account-settings.component.html',
  styleUrls: ['./user-account-settings.component.css']
})
export class UserAccountSettingsComponent implements OnInit {

  currentUser: any;
  visiblePassword: boolean = false;

  constructor(private userActions: UserActions) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
  }

  deleteUser(): void {
    let userId = this.currentUser.id;
    this.userActions.deleteUser(userId);
  }

  showPassword() {
    this.visiblePassword = !this.visiblePassword;
  }
}
