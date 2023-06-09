import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
      if (localStorage.getItem('currentUser') !== undefined && localStorage.getItem('currentUser') !== '' && localStorage.getItem('currentUser') !== null) {
        this.router.navigateByUrl('dashboard');
      }
  }
}
