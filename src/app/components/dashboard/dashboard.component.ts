import { Component, OnInit } from '@angular/core';
import { UserActions } from 'src/app/services/user-actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any;
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  })

  constructor(private userActions: UserActions) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
  }

  logout(): void {
    this.userActions.logout();
  }

  deleteUser(userId: number): void {
    this.userActions.deleteUser(userId);
  }
}
