import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(private userData: UserDataService, private userActions: UserActions, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
    this.userData.getPostsByOwnerId(this.currentUser.id).subscribe((data: any) => {
      this.userPosts = data.reverse();
      this.userPosts.forEach((post: any) => {
        if (post.image != null) {
          post.image = `http://localhost:8080/media/${post.image}`;
        }
      });
    })
  }

  deletePost(postId: number): void {
    this.userActions.deletePost(postId);
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImage = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImage);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    }
    catch (e) {
      console.log(e);
      reject({
        base: null
      })
    }
  });
}
