import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SVC } from '../../config/config';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token = '';
  user: User;
  countriesList = [];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient, public router: Router) { }
  
  uploadStorage() {
    this.token = localStorage.getItem('token');
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.token === null) {
      this.token = '';
      this.user = null;
    }
  }

  login(user: User) {
    const url = URL_SVC + 'login';
    return this.http.post(url, user)
      .subscribe( (res:any) => {
        if(res.token) {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/blog']);
        }
      }, (err) => {
        console.log(err);
        Swal.fire({
          type: 'error',
          title: 'Error!',
          text: 'Correo o Contraseña Incorrectos',
          showConfirmButton: false,
          timer: 2000  
        });
      })
  };

  newUser(user: User) {
    const url = URL_SVC + 'signup';
    return this.http.post( url, user, this.httpOptions)
      .subscribe( res => {
        Swal.fire({
          type: 'success',
          title: 'Usuario Registrado Exitosamente',
          showConfirmButton: false,
          timer: 2000
        })
        this.router.navigate(['/login']);
      }, (err) => {
        Swal.fire({
          type: 'error',
          title: 'Error!',
          text: err.error.message,
          showConfirmButton: false,
          timer: 2000  
        });
      })
  };

  getUserInfo() {
    const url = URL_SVC + 'user';
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    };
    return this.http.get(url, options)
      .subscribe( (res: any) => {
        localStorage.setItem('user', JSON.stringify(res.credentials));
      }, (err) => {
        Swal.fire({
          type: 'error',
          title: 'Error!',
          text: 'Ocurio un error al cargar Usuario',
          showConfirmButton: false,
          timer: 2000  
        });
        this.logout();
      })
  };

  getAllCountries() {
    return this.http.get('https://restcountries.eu/rest/v2/region/americas')
      .pipe( map((data: any) => {
        data.forEach(country => {
          this.countriesList.push(country.name);
         return this.countriesList;
        });
      }, (err) => {
        console.log(err);
      }))
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/home']);
    location.reload();
  }

  isLogged() {
    this.uploadStorage();
    return(this.token.length > 10) ? true : false;
  }

}

