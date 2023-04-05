import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private readonly API = 'http://localhost:8080';

  private handleError(error: HttpErrorResponse) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      Toast.fire({
        icon: 'error',
        title: 'No se ha podido conectar, revise su conexión a internet'
      })
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      if (error.error.message.includes('constrain')) {
        Toast.fire({
          icon: 'error',
          title: 'El nombre de usuario no esta disponible'
        })
      }
      else {
        Toast.fire({
          icon: 'error',
          title: 'Nuestros servicios no estan disponibles por el momento'
        })
      }
      console.error(`Backend returned code ${error.status}`);
    }
    // Return an observable with a user-facing error message.
    Toast.fire({
      icon: 'error',
      title: 'Algo salió mal, intente mas tarde'
    })
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  constructor(private http: HttpClient) { }

  saveUser(user: any): Observable<any> {
    return this.http.post(`${this.API}/new/user`, user).pipe(
      catchError(this.handleError)
    );
  }

  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.API}/update/user`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(userId: any): Observable<any> {
    return this.http.delete(`${this.API}/delete/user?id=${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.API}/get/all-users`).pipe(
      catchError(this.handleError)
    );
  }

  getUserById(userId: any): Observable<any> {
    return this.http.get(`${this.API}/get/user-by-id?id=${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  savePost(post: any): Observable<any> {
    return this.http.post(`${this.API}/new/post`, post).pipe(
      catchError(this.handleError)
    );
  }

  deletePost(postId: any): Observable<any> {
    return this.http.delete(`${this.API}/delete/post?id=${postId}`).pipe(
      catchError(this.handleError)
    );
  }

  getAllPosts() {
    return this.http.get(`${this.API}/get/all-posts`).pipe(
      catchError(this.handleError)
    );
  }

  getPostsByOwnerId(userOwnerId: any): Observable<any> {
    return this.http.get(`${this.API}/get/all-posts-by-owner?id=${userOwnerId}`).pipe(
      catchError(this.handleError)
    );
  }

  login(userLogin: any): Observable<any> {
    return this.http.post(`${this.API}/login`, userLogin).pipe(
      catchError(this.handleError)
    );
  }

  saveComment(comment: any): Observable<any> {
    return this.http.post(`${this.API}/new/comment`, comment).pipe(
      catchError(this.handleError)
    );
  }

  deleteComment(commentId: any): Observable<any> {
    return this.http.delete(`${this.API}/delete/comment?id=${commentId}`).pipe(
      catchError(this.handleError)
    );
  }

  getAllComments(): Observable<any> {
    return this.http.get(`${this.API}/get/all-comments`).pipe(
      catchError(this.handleError)
    );
  }

  getAllCommentsByPostId(postId: any): Observable<any> {
    return this.http.get(`${this.API}/get/all-comments-by-post-id?id=${postId}`).pipe(
      catchError(this.handleError)
    );
  }

  saveImage(formdata: any): Observable<any> {
    return this.http.post(`${this.API}/upload`, formdata).pipe(
      catchError(this.handleError)
    );
  }

  loadImage(filename: string): Observable<any> {
    return this.http.get(`${this.API}/media/${filename}`, {responseType: 'blob'}).pipe(
      catchError(this.handleError)
    );
  }

  saveReport(report: any): Observable<any> {
    return this.http.post(`${this.API}/save/report`, report).pipe(
      catchError(this.handleError)
    );
  }
}
