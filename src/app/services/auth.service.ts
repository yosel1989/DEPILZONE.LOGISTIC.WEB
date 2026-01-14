import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Credenciales, Usuario} from "../models/Usuario";
import {environment} from "../../environments/environment";
import {catchError, map} from "rxjs/operators";
import {Observable, throwError} from "rxjs";
import * as CryptoJS from 'crypto-js';
import {Sede} from "../models/Sede";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers: HttpHeaders;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    });
  }

  login( credenciales: Credenciales ): Observable<Usuario>{

     return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, credenciales,{headers: this.headers}).pipe(
      map(({data, message, status}) => {

        // console.log('login');

        if(status === 200){

          const _u = new Usuario();
          _u.id = data.id;
          _u.nombre = data.nombre;
          _u.perfil = data.perfil;
          _u.idPerfil = data.idPerfil;
          _u.idSede = data.idSede;
          _u.sede = data.sede;
          _u.idGenero = data.idGenero;

          return _u;
        }

        throw throwError(message);
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );

  }

  changePassword( idUsuario: number, oldPassword: string, newPassword: string ): Observable<boolean>{

    return this.http.post<any>(`${environment.apiUrl}/api/auth/changePassword`, {
      actualClave: oldPassword, nuevaClave: newPassword, idUsuario
    },{headers: this.headers}).pipe(
      map(({message, status}) => {

        if(status === 200){

          return true;
        }

        throw throwError(message);
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );

  }

  logout(): void{
    this.clear();
    // window.location.href = "/login";
    this.router.navigate(['/login']);
  }

  setUser( usuario: Usuario ): void{
    localStorage.setItem('_u', CryptoJS.AES.encrypt(JSON.stringify(usuario), environment.key).toString() );
  }
  getUser(): Usuario | null{
    if( localStorage.getItem('_u')){
      const encryp = <string>localStorage.getItem('_u');
      return JSON.parse( CryptoJS.AES.decrypt(encryp, environment.key).toString(CryptoJS.enc.Utf8) );
    }
    return null;
  }
  setSede( sede: Sede ): void{
    localStorage.setItem('_s', CryptoJS.AES.encrypt(JSON.stringify(sede), environment.key).toString() );
  }
  getSede(): Sede | null{
    if( localStorage.getItem('_s')){
      const encryp = <string>localStorage.getItem('_s');
      return JSON.parse( CryptoJS.AES.decrypt(encryp, environment.key).toString(CryptoJS.enc.Utf8) );
    }
    return null;
  }

  clear(): void{
    localStorage.clear();
  }

  isLogin(): boolean{
    return !!this.getUser();
  }

  async  digestMessage(message: number | string) {
    const msgUint8 = new TextEncoder().encode(message.toString());                           // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);           // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
    return hashHex;
  }

}
