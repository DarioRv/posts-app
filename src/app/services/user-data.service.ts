import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private readonly API = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  saveUser(user: any): Observable<any> {
    return this.http.post(`${this.API}/new/user`, user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.API}/update/user`, user);
  }

  deleteUser(userId: any): Observable<any> {
    return this.http.delete(`${this.API}/delete/user?id=${userId}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.API}/get/all-users`);
  }

  getUserById(userId: any): Observable<any> {
    return this.http.get(`${this.API}/get/user-by-id?id=${userId}`);
  }

  savePost(post: any): Observable<any> {
    return this.http.post(`${this.API}/new/post`, post);
  }

  deletePost(postId: any): Observable<any> {
    return this.http.delete(`${this.API}/delete/post?id=${postId}`);
  }

  getAllPosts() {
    return this.http.get(`${this.API}/get/all-posts`);
  }

  getPostsByOwnerId(userOwnerId: any): Observable<any> {
    return this.http.get(`${this.API}/get/all-posts-by-owner?id=${userOwnerId}`)
  }

  login(userLogin: any): Observable<any> {
    return this.http.post(`${this.API}/login`, userLogin);
  }

  saveComment(comment: any): Observable<any> {
    return this.http.post(`${this.API}/new/comment`, comment);
  }

  deleteComment(commentId: any): Observable<any> {
    return this.http.delete(`${this.API}/delete/comment?id=${commentId}`);
  }

  getAllComments(): Observable<any> {
    return this.http.get(`${this.API}/get/all-comments`);
  }

  getAllCommentsByPostId(postId: any): Observable<any> {
    return this.http.get(`${this.API}/get/all-comments-by-post-id?id=${postId}`);
  }

  saveImage(formdata: any): Observable<any> {
    return this.http.post(`${this.API}/upload`, formdata);
  }

  loadImage(filename: string): Observable<any> {
    return this.http.get(`${this.API}/media/${filename}`, {responseType: 'blob'});
  }
}
