import { Component, OnInit } from '@angular/core';
import { UserActions } from 'src/app/services/user-actions';

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  currentUser: any;
  title!: string;
  body!: string;
  image: any;

  constructor(private userActions: UserActions) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
  }

  getDate() {
    return new Date().toLocaleString();
  }

  createPost() {
    const post = {
      "title": this.title,
      "body": this.body,
      "image": this.image,
      "date": this.getDate(),
      "userOwner": this.currentUser
    }
    this.userActions.savePost(post);
  }
}
