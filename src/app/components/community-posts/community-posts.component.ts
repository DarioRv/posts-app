import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserActions } from 'src/app/services/user-actions';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'community-posts',
  templateUrl: './community-posts.component.html',
  styleUrls: ['./community-posts.component.css']
})
export class CommunityPostsComponent implements OnInit {
  currentUser: any;
  communityPosts: any;
  comment!: string;
  form!: FormGroup;

  constructor(private userData: UserDataService, private userActions: UserActions, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        comment: []
      }
    );
  }

  ngOnInit(): void {
    this.userData.getAllPosts().subscribe((data: any) => {this.communityPosts = data.reverse();});
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  }

  sendComment(post: any) {
    let comment = this.form.get('comment')?.value;
    this.userActions.commentOnAPost(post, comment);
  }

  deleteComment(commentId: number) {
    this.userActions.deleteComment(commentId);
  }

  getUserById(userId: number) {
    let username: string = '';
    this.userData.getUserById(userId).subscribe(data => {
      username = data.username;
    });
    console.log(username)
  }
}
