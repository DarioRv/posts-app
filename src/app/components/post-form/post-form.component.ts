import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { UserActions } from 'src/app/services/user-actions';

@Component({
  selector: 'post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  currentUser: any;
  postForm!: FormGroup;
  imagePreview!: string;

  constructor(private userActions: UserActions, private formBuilder: FormBuilder, private sanitizer: DomSanitizer) {
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

  createPost(event: any) {
    if (this.postForm.valid) {
      const image = event.target[2].files[0];
      const post = {
        "title": this.Title?.value,
        "body": this.Body?.value,
        "image": image ? image.name : null,
        "date": this.getDate(),
        "userOwner": this.currentUser
      }
      if (image != undefined) {
        this.saveImage(image);
      }
      this.userActions.savePost(post);
      this.postForm.reset();
      this.imagePreview = '';
    }
    else {
      this.postForm.markAllAsTouched();
    }
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

  generateImagePreview(event: any) {
    const image = event.target.files[0];
    this.extraerBase64(image).then((image: any) => this.imagePreview = image.base);
  }

  saveImage(image: any) {
    const formData = new FormData();
    formData.append('file', image);
    this.userActions.saveImage(formData);
  }
}
