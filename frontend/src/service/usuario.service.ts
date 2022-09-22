import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/model/Usuario';
import jwt_decode from 'jwt-decode';

// variables
const baseUrl = 'http://localhost:3000/users';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {

  constructor(private http: HttpClient) { }

  getAuthToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  getAuthId() {
    const id = window.localStorage.getItem('id');
    return Number(id);
  }

  getAuthIdStr() {
    const id = window.localStorage.getItem('id');
    return id;
  }

  getAuthRole() {
    const role = window.localStorage.getItem('role');
    return role;
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(`${baseUrl}/login`, user)
  }

  getUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${baseUrl}/all`)
  }

  getUserName(name: any): Observable<Usuario> {
    return this.http.get<Usuario>(`${baseUrl}/nome/?nome=${name}`)
  }

  getUserCpf(cpf: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${baseUrl}/cpf/?cpf=${cpf}`)
  }

  getUserId(id: any): Observable<Usuario> {
    return this.http.get<Usuario>(`${baseUrl}/id/?id=${id}`)
  }

  postUser(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${baseUrl}`, user)
  }

  patchUser(id: number, user: Usuario): Observable<Usuario> {
    return this.http.patch<Usuario>(`${baseUrl}/update/?id=${id}`, user)
  }

  deleteUser(id: number): Observable<Usuario> {
    return this.http.delete<Usuario>(`${baseUrl}/delete/?id=${id}`)
  }

  resetPass(user: Usuario): Observable<Usuario> {
    return this.http.patch<Usuario>(`${baseUrl}/password`, user)
  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token);

    if (decoded.exp === undefined) {
      return new Date(0);
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp)
    return date;
  }

  isTokenExpired(token?: string): boolean {

    if (!token) {
      return true
    }

    const date = this.getTokenExpirationDate(token)
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn() {
    const token = this.getAuthToken();

    if (!token) {
      return false;
    }
    else if (this.isTokenExpired(token)) {
      return false;
    }

    return true
  }

}
