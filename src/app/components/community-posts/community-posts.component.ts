import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserActions } from 'src/app/services/user-actions';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'community-posts',
  templateUrl: './community-posts.component.html',
  styleUrls: ['./community-posts.component.css']
})
export class CommunityPostsComponent implements OnInit {
  currentUser: any;
  communityPosts: any = [];
  comment!: string;
  form!: FormGroup;
  image: any;
  dataLoaded: boolean = false;
  conexionFailed: boolean = false;


  constructor(private userData: UserDataService, private userActions: UserActions, private formBuilder: FormBuilder, private sanitizer: DomSanitizer) {
    this.form = this.formBuilder.group(
      {
        comment: ['', [Validators.required]]
      }
    );
  }

  ngOnInit(): void {
    this.userData.getAllPosts().subscribe((data: any) => {
      this.communityPosts = data.reverse();
      this.communityPosts.map((post: any) => {
        if (post.image != null) {
          post.image = `http://localhost:8080/media/${post.image}`;
        }
      });
      this.dataLoaded = true;
    });
    this.currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  }

  get Comment() {
    return this.form.get('comment');
  }

  sendComment(post: any) {
    if (this.form.valid) {
      let comment = this.form.get('comment')?.value;
      this.userActions.commentOnAPost(post, comment);
    }
    else {
      this.form?.markAllAsTouched();
    }
  }

  deleteComment(commentId: number) {
    this.userActions.deleteComment(commentId);
  }
}
