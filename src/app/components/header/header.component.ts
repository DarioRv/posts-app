import { Component } from '@angular/core';
import { UserActions } from 'src/app/services/user-actions';

@Component({
  selector: 'header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private userActions: UserActions) {}

  logout(): void {
    this.userActions.logout();
  }
}
