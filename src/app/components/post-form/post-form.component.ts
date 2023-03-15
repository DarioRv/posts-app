import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserActions } from 'src/app/services/user-actions';

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  currentUser: any;
  postForm!: FormGroup;

  constructor(private userActions: UserActions, private formBuilder: FormBuilder) {
    this.postForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      image: ['', []]
    });
  }

  ngOnInit(): void {
    this.currentUser = localStorage.getItem('currentUser');
    this.currentUser = JSON.parse(this.currentUser);
  }

  getDate() {
    return new Date().toLocaleString();
  }

  get Title() {
    return this.postForm.get('title');
  }

  get Body() {
    return this.postForm.get('body');
  }

  get Image() {
    return this.postForm.get('image');
  }

  createPost() {
    if (this.postForm.valid) {
      const post = {
        "title": this.Title?.value,
        "body": this.Body?.value,
        "image": this.Image?.value,
        "date": this.getDate(),
        "userOwner": this.currentUser
      }
      this.userActions.savePost(post);
    }
    else {
      this.postForm.markAllAsTouched();
    }
  }
}
