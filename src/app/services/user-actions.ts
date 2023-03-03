import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class UserActions {
  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  })

  constructor(private router: Router, private userData: UserDataService) { }

  logout(): void {
    this.Toast.fire({
      icon: 'info',
      title: 'Cerrando tu sesion'
    })
    setTimeout(() => {
      localStorage.removeItem('currentUser');
      this.router.navigateByUrl('/');
    }, 2000);
  }

  login(user: any): void {
    if (user != null) {
      this.Toast.fire({
        icon: 'success',
        title: 'Redirigiendo al dashboard'
      })
      setTimeout(() => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.router.navigateByUrl('dashboard');
      }, 2000);
    }
    else {
      this.Toast.fire({
        icon: 'error',
        title: 'Credenciales incorrectas'
      })
    }
  }

  deleteUser(userId: number): void {
    Swal.fire({
      title: '¿Está seguro de eliminar su cuenta?',
      icon: 'warning',
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No'
    }).then((res) => {
      if (res.isConfirmed) {
        this.Toast.fire({
          icon: 'success',
          title: 'Tu cuenta ha sido eliminada'
        })
        this.userData.deleteUser(userId).subscribe();
        setTimeout(() => {
          localStorage.removeItem('currentUser');
          this.router.navigateByUrl('/');
        }, 2000);
      }
      else{
        this.Toast.fire({
          icon: 'info',
          title: 'La acción ha sido cancelada'
        })
      }
    });
}
}
