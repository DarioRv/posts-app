import { Component, OnInit } from '@angular/core';
import { UserActions } from 'src/app/services/user-actions';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'user-space',
  templateUrl: './user-space.component.html',
  styleUrls: ['./user-space.component.css']
})
export class UserSpaceComponent implements OnInit {
  currentUser: any;
  userPosts: any;

  constructor(private userData: UserDataService, private userActions: UserActions) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
    this.userData.getPostsByOwnerId(this.currentUser.id).subscribe(data => {this.userPosts = data.reverse(); console.log(data)})
  }

  deletePost(postId: number): void {
    this.userActions.deletePost(postId);
  }
}
